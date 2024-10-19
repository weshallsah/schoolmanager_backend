import { Router } from "express";
import {
  generate,
  generateprogress,
  getmarks,
  uploadmarks,
} from "../controllers/marks.controller.js";

const routes = Router();

routes.route("/upload").post(uploadmarks);

routes.route("/generate").post(generate);

routes.route("/download").post(generateprogress);
routes.route("/getmark/:trem/:std/:id").get(getmarks);
export default routes;
