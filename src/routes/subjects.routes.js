import { Router } from "express";
import { listsubjet, subjectAdd } from "../controllers/subject.controller.js";

const routes = Router();

routes.route("/addsubject/:STD").post(
    subjectAdd
);

routes.route("/list/:STD").get(listsubjet);

export default routes;
