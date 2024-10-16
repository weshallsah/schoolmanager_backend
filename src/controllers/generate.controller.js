import sharp from "sharp";
import fs from "fs";
import path from "path";
import { bonafide } from "../../public/svg/bonafide.js";
import { progress } from "../../public/svg/progress.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";

const generateCertificate = async (svg) => {
  try {
    const background = await sharp("./public/media//background.png")
      .resize(595, 842) // Resize the background if needed
      .toBuffer();
    let textSVG = svg;
    const svgstr = textSVG.replace(/&/g, "&amp;");
    // .replace(/</g, "&lt;")
    // .replace(/>/g, "&gt;")
    // .replace(/"/g, "&quot;")
    // Combine the background and text
    const buffer = await Buffer.from(svgstr);
    const result = await sharp(background)
      .composite([
        {
          input: buffer,
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
    // fs.writeFileSync("certificate.png", result);
    console.log("Certificate generated successfully!");
    return result;
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};

// Usage
// generateCertificate("John Doe", "Introduction to Node.js", "October 10, 2024");

export { generateCertificate };
