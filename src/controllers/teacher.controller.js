import { Teacher } from "../models/teacher.model.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import mongoose from "mongoose";

const fire = AsyncHandeller(async (req, res) => {
  try {
    const { enroll } = await req.params.enroll;
    const teacher = await Teacher.findOneAndUpdate(
      { enroll: enroll },
      { status: false }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(500)
      .json(ApiError(500, "someting went wrong server error", error));
  }
});

const login = AsyncHandeller(async (req, res) => {
  try {
    const { enroll, school, password } = req.body;
    console.log(school);
    const user = await Teacher.findOne({
      $and: [
        {
          enroll: enroll.trim(),
        },
        {
          school: school.trim(),
        },
      ],
    });
    if (user == null) {
      throw new ApiError(404, "user not found");
    }
    const iscorrect = await user.ispasswordCorrect(password);
    console.log("iscorrect :=",iscorrect);
    if (iscorrect) {
      throw new ApiError(400, "please check your credentials");
    }
    const teacher = await Teacher.findById(user._id).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher login successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error, error.message));
  }
});

const recrute = AsyncHandeller(async (req, res) => {
  try {
    const {
      name,
      enroll,
      fathername,
      mothername,
      phone,
      gender,
      age,
      password,
      email,
      address,
      school,
    } = req.body;
    const user = await Teacher.create({
      name,
      enroll,
      fathername,
      mothername,
      phone,
      gender,
      password,
      age,
      email,
      address,
      school,
    });
    if (
      (await await Teacher.findOne({
        $and: [
          {
            enroll: enroll,
          },
          {
            school: school,
          },
        ],
      })) != null
    ) {
      throw new ApiError(401, "user alredy exits");
    }
    const teacher = await Teacher.findById(user._id).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error, error.message));
  }
});

export { recrute, login };
