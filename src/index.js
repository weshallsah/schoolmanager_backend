import { app } from "./app.js";
import { connectDB } from "./DB/index.js";
import http from "http";
import dotenv from "dotenv";
import { generateCertificate } from "./controllers/generate.controller.js";
import { bonafide } from "../public/svg/bonafide.js";

dotenv.config({ path: ".env" });

const server = http.createServer(app);

connectDB().then(() => {
  server.timeout = 0;
  server.listen(process.env.PORT || 8000, () => {
    console.log(`server is listening on PORT ${process.env.PORT || 8000}`);

    // generateCertificate(
    //   "",
    //   800,
    //   1100,
    //   "670cc33b5bdac530295bc0c2"
    // );
  });
});
