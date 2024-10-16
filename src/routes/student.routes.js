import { Router } from "express";
import {
  admission,
  listStudent,
  removestudent,
  Studentmarks,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const routes = Router();

routes.route("/admission").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  admission
);

routes.route("/remove/:enroll").get(removestudent);

routes.route("/list/:school").get(listStudent);

routes.route("/marks/:school/:tream/:STD").get(Studentmarks);

export default routes;
