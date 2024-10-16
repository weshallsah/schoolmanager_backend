import { Router } from "express";
import {
  listattendance,
  uploadattenndance,
} from "../controllers/attendance.controller.js";

const routes = Router();

routes.route("/upload/:Date/:School").post(uploadattenndance);
routes.route("/list/:Date/:School").get(listattendance);

export default routes;
