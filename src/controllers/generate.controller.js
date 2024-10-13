import sharp from "sharp";
import fs from "fs";
import path from "path";
import { bonafide } from "../../public/svg/bonafide.js";
import { progress } from "../../public/svg/progress.js";

async function generateCertificate(name, courseName, date) {
  try {
    // Load the background image
    const background = await sharp("./public/media//background.png")
      .resize(800, 1100) // Resize the background if needed
      .toBuffer();
    // console.log(background);
    // Create a new image with the text
    const textSVG = progress();
    const svgstr = textSVG.replace(/&/g, "&amp;")
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
    // Save the result
    fs.writeFileSync("certificate.png", result);
    console.log("Certificate generated successfully!");
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
}

// Usage
// generateCertificate("John Doe", "Introduction to Node.js", "October 10, 2024");

export{
    generateCertificate
}