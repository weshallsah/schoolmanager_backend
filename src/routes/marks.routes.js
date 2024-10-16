import { Router } from "express";
import { uploadmarks } from "../controllers/marks.controller.js";

const routes = Router();

routes.route("/upload").post(uploadmarks);

export default routes;
