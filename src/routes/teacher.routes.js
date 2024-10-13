import { Router } from "express";
import { login, recrute } from "../controllers/teacher.controller.js";

const routes = Router();

routes.route("/hire").post(recrute);

routes.route("/login").post(login);

export default routes;
