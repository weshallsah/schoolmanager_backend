import { Router } from "express";
import { uploadattenndance } from "../controllers/attendance.controller.js";


const routes = Router();

routes.route('/upload').post(
    uploadattenndance
);

export default routes;