import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "server is running",
  });
});

import studentroutes from "./routes/student.routes.js";
import teacherroutes from "./routes/teacher.routes.js";
import cretificateroutes from "./routes/certificates.routes.js";
import { generateCertificate } from "./controllers/generate.controller.js";
import attendanceroute from "./routes/attendance.routes.js";

app.use("/api/v1/student", studentroutes);
app.use("/api/v1/teacher", teacherroutes);
app.use("/api/v1/certificate", cretificateroutes);
app.use("/api/v1/attendance", attendanceroute);
// var cnt = 0;
// if (cnt == 0) {
//   generateCertificate();
//   cnt++;
// }

export { app };
