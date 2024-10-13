import mongoose from "mongoose";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import fs from "fs";

const admission = AsyncHandeller(async (req, res) => {
  try {
    const {
      name,
      enroll,
      school,
      fathername,
      mothername,
      phone,
      dob,
      gender,
      address,
      mothertoungue,
      aadhar,
      nationality,
      placeofbrith,
    } = await req.body;
    const isuser = await Student.findOne({ enroll });
    if (isuser != null) {
      throw new ApiError(400, "user already exists");
    }
    const avatarpath = req.files.avatar;
    console.log(avatarpath[0].path);
    let photo = "";
    if (avatarpath != null) {
      const DB = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(DB, {
        bucketName: "schoolmanager",
      });
      const stream = fs.createReadStream(avatarpath[0].path);
      photo = await stream.pipe(bucket.openUploadStream(name)).id;
      console.log(photo);
    }
    const student = await Student.create({
      name,
      enroll,
      school,
      fathername,
      mothername,
      phone,
      dob,
      gender,
      address,
      mothertoungue,
      aadhar,
      photo,
      nationality,
      placeofbrith,
    });
    console.log(student);
    await fs.unlinkSync(avatarpath[0].path);
    return res
      .status(200)
      .send(new ApiResponse(200, student, "student added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(error.statuscode)
      .send(new ApiResponse(error.statuscode, error.message));
  }
});

const removestudent = AsyncHandeller(async (req, res) => {
  try {
    const enroll = req.params.enroll;
    // console.log(enroll);

    return res
      .status(200)
      .json(new ApiResponse(200, student, "student added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(500)
      .json(ApiError(500, "someting went wrong server error", error));
  }
});

export { admission, removestudent };
