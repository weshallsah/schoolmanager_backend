import { Router } from "express";
import { Addschool } from "../controllers/school.controller.js";

const routes = Router();

routes.route("/add").post(Addschool);

export default routes;
