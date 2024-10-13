import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(cors(
    {
        origin: process.env.ORIGIN
    }
));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",async(req,res)=>{
    res.status(200).send({
        "message":"server is running"
    })
});

import studentroutes from "./routes/student.routes.js";
import teacherroutes from "./routes/teacher.routes.js";


app.use("/api/v1/student",studentroutes);
app.use("/api/v1/teacher",teacherroutes);

export { app };
