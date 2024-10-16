import mongoose from "mongoose";
import { Mark } from "../models/Marks.models.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const uploadmarks = AsyncHandeller(async (req, res) => {
  try {
    const { student, teacher, tream, standard, subject, marks } = req.body;
    const isexist = await Mark.findOne({
      $and: [
        { student: new mongoose.Types.ObjectId(student) },
        { tream: tream },
        { standard: standard },
      ],
    });
    // console.log(isexist);
    if (isexist != null) {
      throw new ApiError(400, "Marks alredy added");
    }
    const payload = await Mark.create({
      student: new mongoose.Types.ObjectId(student),
      teacher: new mongoose.Types.ObjectId(teacher),
      tream,
      subject,
      standard,
      marks: JSON.parse(marks),
    });
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "Marrks uploaded sucessful"));
  } catch (error) {
    console.log(`error := ${error}`);
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error.message));
  }
});

export { uploadmarks };
