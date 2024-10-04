import { Router } from "express";
import { admission, removestudent } from "../controllers/student.controller.js";

const routes = Router();

routes.route("/admission").post(admission);

routes.route("/remove/:enroll").get(removestudent);

export default routes;
