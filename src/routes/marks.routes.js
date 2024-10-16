import { Router } from "express";
import {
  generate,
  generateprogress,
  uploadmarks,
} from "../controllers/marks.controller.js";

const routes = Router();

routes.route("/upload").post(uploadmarks);

routes.route("/generate").post(generate);

routes.route("/download").post(generateprogress);
export default routes;
