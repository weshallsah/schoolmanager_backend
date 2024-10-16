import { Teacher } from "../models/teacher.model.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import mongoose from "mongoose";
import fs from "fs";

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
    const { email, school, password } = req.body;
    console.log(school);
    const user = await Teacher.findOne({
      $and: [
        {
          email: email.trim(),
        },
        {
          school: school.toLowerCase().trim(),
        },
      ],
    });
    if (user == null) {
      throw new ApiError(404, "user not found");
    }
    const iscorrect = await user.ispasswordCorrect(password);
    console.log("iscorrect :=", iscorrect);
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
      dob,
      password,
      email,
      address,
      school,
      isadmin,
    } = req.body;
    const isuser = await Teacher.findOne({ enroll });
    if (isuser != null) {
      throw new ApiError(400, "user already exists");
    }
    console.log(isuser);
    const avatarpath = req.files.avatar;
    console.log(avatarpath[0].path);
    let photo = "";
    if (avatarpath != null) {
      const DB = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(DB, {
        bucketName: "schoolmanager",
      });
      const stream = fs.createReadStream(avatarpath[0].path);
      photo = await stream.pipe(bucket.openUploadStream(name)).id;
      console.log(photo);
    }
    const user = await Teacher.create({
      name,
      enroll,
      fathername,
      mothername,
      phone,
      gender,
      password,
      dob,
      email,
      address,
      school,
      isadmin,
      photo,
    });
    await fs.unlinkSync(avatarpath[0].path);
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

const listTeacher = AsyncHandeller(async (req, res) => {
  try {
    const school = req.params.school;
    console.log(school);
    const payload = await Teacher.aggregate([
      {
        $match: { school },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "teacher fetch sucessfully"));
  } catch (error) {
    console.log(`error := ${error}`);
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error.message));
  }
});
const updateStandard = AsyncHandeller(async (req, res) => {
  const id = req.params.id;
  const payload = await Teacher.findByIdandUpdate();
});
const sendphoto = AsyncHandeller(async (req, res) => {
  try {
    const photoId = await req.params.id;
    console.log(photoId);
    const DB = mongoose.connection.db;
    const photo = await DB.collection("schoolmanager.files").findOne({
      _id: new mongoose.Types.ObjectId(photoId),
    });
    console.log(photo);
    const bucket = new mongoose.mongo.GridFSBucket(DB, {
      bucketName: "schoolmanager",
    });
    bucket.openDownloadStream(photo._id).pipe(res);
  } catch (error) {
    console.log("error := ", error);
    return res.status(500).json(new ApiResponse(500, "something went wrong"));
  }
});
export { recrute, login, listTeacher, updateStandard, sendphoto };
