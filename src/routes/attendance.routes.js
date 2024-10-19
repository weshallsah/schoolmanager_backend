import { Router } from "express";
import {
  listattendance,
  uploadattenndance,
} from "../controllers/attendance.controller.js";

const routes = Router();

routes.route("/upload/:Date/:School/:std").post(uploadattenndance);
routes.route("/list/:Date/:School/:std").get(listattendance);

export default routes;
