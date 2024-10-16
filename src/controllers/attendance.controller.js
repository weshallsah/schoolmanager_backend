import mongoose from "mongoose";
import { Attendance } from "../models/attendance.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";

const uploadattenndance = AsyncHandeller(async (req, res) => {
  try {
    const { attendance } = req.body;
    const Date = req.params.Date;
    const school = req.params.School;
    console.log(Date);
    console.log(attendance);
    const enroll = JSON.parse(attendance);
    console.log(enroll);
    let present = [];
    for (let i = 0; i < enroll.length; i++) {
      present.push(new mongoose.Types.ObjectId(enroll[i]));
    }
    // console.log(present);
    const payload = await Attendance.create({
      Date,
      school,
      present,
    });
    console.log(payload);
    return res
      .status(200)
      .json(new ApiResponse(200, "attendance get successful"));
  } catch (error) {
    console.log(`error := ${error}`);
    return res.status(500).send(new ApiResponse(500, "something went wrong"));
  }
});

const listattendance = AsyncHandeller(async (req, res) => {
  const Date = req.params.Date;
  const school = req.params.School;
  console.log(Date);
  const payload = await Attendance.findOne({
    $and: [{ Date: Date }, { school: school }],
  });
  console.log(payload);
  return res
    .status(200)
    .json(new ApiResponse(200, payload, "attendance fetch sucessfully"));
});

export { uploadattenndance, listattendance };
