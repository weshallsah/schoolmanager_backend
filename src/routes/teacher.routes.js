import { Router } from "express";
import {
  fire,
  listTeacher,
  login,
  recrute,
  sendphoto,
  updateStandard,
} from "../controllers/teacher.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const routes = Router();

routes.route("/hire").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  recrute
);

routes.route("/login").post(login);

routes.route("/list/:school").get(listTeacher);

routes.route("/viewphoto/:id").get(sendphoto);

routes.route("/fire/:enroll").get(fire);

routes.route("/standard/:id/:std").get(updateStandard);

export default routes;
