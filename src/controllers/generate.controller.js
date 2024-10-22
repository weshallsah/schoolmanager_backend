import sharp from "sharp";
import mongoose from "mongoose";
import fs from "fs";
import { ApiError } from "../utils/ApiError.utils.js";

const generateCertificate = async (svg, width, hight, photoId) => {
  try {
    const background = await sharp("./public/media//background.png")
      .resize(width, hight) // Resize the background if needed
      .toBuffer();

    let textSVG = svg;
    const svgstr = textSVG.replace(/&/g, "&amp;");
    const buffer = Buffer.from(svgstr);
    let result = await sharp(background)
      .composite([
        {
          input: buffer,
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
    if (photoId != "") {
      const DB = mongoose.connection.db;
      // console.log(DB);
      const photo = await DB.collection("schoolmanager.files").findOne({
        _id: new mongoose.Types.ObjectId(photoId),
      });
      // console.log(photo);
      const bucket = new mongoose.mongo.GridFSBucket(DB, {
        bucketName: "schoolmanager",
      });

      const DBimage = await new Promise((resolve, rejects) => {
        bucket
          .openDownloadStream(photo._id)
          .on("data", (data) => {
            resolve(data);
          })
          .on("error", (error) => {
            rejects("");
          });
      });
      const studentphoto = await sharp(DBimage).resize(149, 179).toBuffer();

      result = await sharp(result)
        .composite([
          {
            input: studentphoto,
            top: 140,
            left: 50,
          },
        ])
        .png()
        .toBuffer();
    }
    // fs.unlinkSync();
    fs.writeFileSync("./certificate.png", result);
    console.log("Certificate generated successfully!");
    return result;
  } catch (error) {
    console.error("Error generating certificate:", error);
    throw new ApiError(error.statusCode , error.message);
  }
};

export { generateCertificate };
