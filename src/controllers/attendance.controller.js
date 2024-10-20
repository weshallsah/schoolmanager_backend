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
    let standard = req.params.std - "0";
    const enroll = JSON.parse(attendance);
    let present = [];
    console.log(enroll);
    for (let i = 0; i < enroll.length; i++) {
      if (enroll[i] != "") {
        present.push(new mongoose.Types.ObjectId(enroll[i]));
      } else {
        present.push(null);
      }
    }
    let payload = await Attendance.findOne({
      $and: [
        {
          Date: Date,
        },
        {
          school: school,
        },
        {
          standard: standard,
        },
      ],
    });
    console.log(payload);
    if (payload != null) {
      payload["present"] = present;
      payload.save();
    } else {
      payload = await Attendance.create({
        Date,
        school,
        standard,
        present,
      });
    }
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
  const standard = req.params.std;
  const payload = await Attendance.findOne({
    $and: [{ Date: Date }, { school: school }, { standard: standard }],
  });
  console.log(payload);
  return res
    .status(200)
    .json(new ApiResponse(200, payload, "attendance fetch sucessfully"));
});

export { uploadattenndance, listattendance };
