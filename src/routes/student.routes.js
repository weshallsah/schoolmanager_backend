import { Router } from "express";
import { admission, removestudent } from "../controllers/student.controller.js";
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

export default routes;
