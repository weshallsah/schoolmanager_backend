import { Teacher } from "../models/teacher.model.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import mongoose from "mongoose";
import { School } from "../models/School.models.js";
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
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error, error.message));
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
      standard,
    } = req.body;
    console.log(email);

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
      let isuser = await Teacher.findOne({
        $or: [
          { $and: [{ enroll: enroll }, { school: school }] },
          { $and: [{ email: email }, { school: school }] },
        ],
      });
      console.log(isuser);
      if (isuser != null) {
        await fs.unlinkSync(avatarpath[0].path);
        throw new ApiError(400, "Teacher already exists");
      }
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
      standard,
    });

    const teacher = await Teacher.findById(user._id).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

const register = AsyncHandeller(async (req, res) => {
  try {
    const {
      school,
      address,
      Affiliated,
      center,
      Taluka,
      district,
      mail,
      Medium,
      state,
      contact,
      AffiliationNo,
      UDiseCode,
      SchoolCode,
      grno,
      establish,
      name,
      enroll,
      fathername,
      mothername,
      phone,
      gender,
      dob,
      password,
      email,
      paddress,
      isadmin,
      Standard,
    } = req.body;
    let photo = null;
    let avatarpath;
    if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
    ) {
      avatarpath = req.files.avatar;
      console.log(avatarpath[0].path);
      const DB = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(DB, {
        bucketName: "schoolmanager",
      });
      const stream = fs.createReadStream(avatarpath[0].path);
      photo = stream.pipe(bucket.openUploadStream(name)).id;
      console.log(photo);
      console.log(avatarpath[0].path);
    }
    let isuser = await School.findOne({
      school,
    });
    if (isuser != null) {
      throw new ApiError(400, "School alredy exists");
    }
    isuser = await Teacher.findOne({
      $or: [
        { $and: [{ enroll: enroll }, { school: school }] },
        { $and: [{ email: email }, { school: school }] },
      ],
    });
    console.log(isuser);
    if (isuser != null) {
      throw new ApiError(400, "Teacher already exists");
    }
    const payload = await School.create({
      school: school.toLowerCase(),
      address,
      Affiliated,
      center,
      Taluka,
      district,
      mail,
      Medium,
      state,
      contact,
      AffiliationNo,
      UDiseCode,
      SchoolCode,
      grno,
      enroll,
      establish,
    });
    console.log(payload);
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
      address: paddress,
      school: school.toLowerCase(),
      isadmin,
      photo,
    });
    fs.unlinkSync(avatarpath[0].path);
    const teacher = await Teacher.findById(user._id).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "Teacher create successfully"));
  } catch (error) {
    console.log(`ERRoR := ${error}`);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
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
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
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
    payload.save();
    console.log(payload);
    return res.status(200).json(new ApiResponse(200, "updated successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
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

const getteacher = AsyncHandeller(async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (id == null) {
      throw new ApiError(404, "teacher id not found");
    }
    const teacher = await Teacher.findById(id).select("-password");
    console.log(teacher);
    return res
      .status(200)
      .json(new ApiResponse(200, teacher, "teacher fetch sucessfully"));
  } catch (error) {
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});
export {
  recrute,
  login,
  listTeacher,
  updateStandard,
  sendphoto,
  fire,
  register,
  getteacher,
};
