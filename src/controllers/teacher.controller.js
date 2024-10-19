import { Teacher } from "../models/teacher.model.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import mongoose from "mongoose";
import fs from "fs";

const fire = AsyncHandeller(async (req, res) => {
  try {
    const enroll = await req.params.enroll;
    console.log(enroll);
    const teacher = await Teacher.findByIdAndUpdate(enroll, { status: false });
    teacher.save();
    console.log(teacher);
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher fire successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(500)
      .json(ApiError(500, "someting went wrong server error", error));
  }
});

const login = AsyncHandeller(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Teacher.findOne({
      email: email.trim(),
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
      Standard,
    } = req.body;
    console.log(email);
    let isuser = await Teacher.findOne({
      $or: [
        { $and: [{ enroll: enroll }, { school: school }] },
        { $and: [{ email: email }, { school: school }] },
        // { $and: [{ standard: Standard }, { school: school }] },
      ],
    });
    if (isuser != null) {
      throw new ApiError(400, "Teacher already exists");
    }
    if (Standard != "") {
      console.log("checking inside standard");
      isuser = await Teacher.findOne({
        $and: [{ standard: Standard }, { school: school }],
      });
      if (isuser["standard"] != -1) {
        throw new ApiError(400, "Standard alredy have teacher");
      }
    }
    let photo = null;
    if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
    ) {
      const avatarpath = req.files.avatar;
      const DB = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(DB, {
        bucketName: "schoolmanager",
      });
      const stream = fs.createReadStream(avatarpath[0].path);
      photo = await stream.pipe(bucket.openUploadStream(name)).id;
      console.log(photo);
      await fs.unlinkSync(avatarpath[0].path);
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

    const teacher = await Teacher.findById(user._id).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error.message));
  }
});

const listTeacher = AsyncHandeller(async (req, res) => {
  try {
    const school = req.params.school;
    console.log(school);
    const payload = await Teacher.aggregate([
      {
        $match: { school, status: true },
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
  try {
    const id = req.params.id;
    if (id == null) {
      throw new ApiError(404, "teacher id not found");
    }
    const std = req.params.std;
    // if(std=)
    console.log(id);
    console.log(std);
    const payload = await Teacher.findByIdAndUpdate(id, { standard: std });
    console.log(payload);
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "updated successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(error.statuscode)
      .json(new ApiResponse(error.statuscode, error.message));
  }
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
export { recrute, login, listTeacher, updateStandard, sendphoto, fire };
