import mongoose from "mongoose";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import fs from "fs";
import { School } from "../models/School.models.js";
import { generateCertificate } from "./generate.controller.js";
import { leavingcertificate } from "../../public/svg/lc.js";
import { bonafide } from "../../public/svg/bonafide.js";
import { ToWords } from "to-words";

const admission = AsyncHandeller(async (req, res) => {
  try {
    const {
      name,
      enroll,
      school,
      fathername,
      mothername,
      phone,
      dob,
      gender,
      address,
      mothertoungue,
      aadhar,
      nationality,
      placeofbrith,
      religion,
      caste,
      serial,
      standard,
    } = await req.body;
    console.log(standard);
    const isuser = await Student.findOne({ enroll });
    if (isuser != null) {
      throw new ApiError(400, "user already exists");
    }
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
    let _school = await School.findOne({ school });
    _school["grno"]++;
    _school.save();
    const student = await Student.create({
      name,
      enroll,
      school,
      fathername,
      mothername,
      phone,
      dob,
      gender,
      address,
      mothertoungue,
      aadhar,
      photo,
      nationality,
      placeofbrith,
      GRNo: _school["grno"],
      religion,
      caste,
      serial,
      standard,
    });
    console.log(student);
    await fs.unlinkSync(avatarpath[0].path);
    return res
      .status(200)
      .send(new ApiResponse(200, student, "student added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(error.statusCode)
      .send(new ApiResponse(error.statusCode, error.message));
  }
});

const removestudent = AsyncHandeller(async (req, res) => {
  try {
    const enroll = req.params.enroll;
    // console.log(enroll);

    return res
      .status(200)
      .json(new ApiResponse(200, student, "student added successfully"));
  } catch (error) {
    console.log("error := ", error);
    return res
      .status(500)
      .json(ApiError(500, "someting went wrong server error", error));
  }
});

const listStudent = AsyncHandeller(async (req, res) => {
  try {
    const school = req.params.school;
    const standard = req.params.std;
    const year = new Date();
    const payload = await Student.aggregate([
      {
        $match: {
          school,
          status: true,
          standard: parseInt(standard),
        },
      },
      {
        $project: {
          name: 1,
          enroll: 1,
          standard: 1,
          trem: 1,
        },
      },
    ]);
    console.log(payload);
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "student fetch sucessfully"));
  } catch (error) {
    console.log(`error := ${error}`);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

const Studentmarks = AsyncHandeller(async (req, res) => {
  try {
    const school = req.params.school;
    const tream = req.params.tream;
    const standard = req.params.STD;
    const date = new Date().getFullYear();
    const year = date.toString();
    const payload = await Student.aggregate([
      {
        $match: {
          school,
          standard: parseInt(standard),
        },
      },
      {
        $lookup: {
          from: "marks",
          localField: "_id",
          foreignField: "student",
          as: "result",
          pipeline: [
            {
              $match: {
                year,
              },
            },
            {
              $project: {
                tream: 1,
                subject: 1,
                marks: 1,
                progress: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$result",
      },
      {
        $match: {
          "result.tream": tream - "0",
        },
      },
      {
        $project: {
          result: 1,
          name: 1,
          enroll: 1,
          standard: 1,
        },
      },
    ]);
    console.log(payload);
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "fetched successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, "something went wrong!"));
  }
});

const generateLC = AsyncHandeller(async (req, res) => {
  try {
    const {
      schoolId,
      StudentID,
      Examresult,
      lastpaiddues,
      FeeConcession,
      activites,
      GeneralConduct,
      ReasonforLeaving,
      Remarks,
    } = req.body;
    if (schoolId.trim() == "" && StudentID.trim() == "") {
      throw new ApiError(404, "please provide particular info");
    }
    const school = await School.findOne({
      school: schoolId.toLowerCase().trim(),
    });
    console.log(school);
    const student = await Student.findOne({
      $and: [{ enroll: StudentID }, { school: schoolId.toLowerCase() }],
    });
    if (student == null) {
      throw new ApiError(404, "No student found with this enroll number");
    }
    console.log(student);
    const date = student["createdAt"];
    const toWord = new ToWords();
    // console.log();
    const svg = leavingcertificate(
      schoolId,
      school["address"],
      school["Affiliated"],
      school["state"],
      school["contact"],
      school["AffiliationNo"],
      school["UDiseCode"],
      school["SchoolCode"],
      student["GRNo"],
      schoolId,
      student["serial"],
      student["name"],
      student["mothername"],
      student["fathername"],
      `${student["dob"].getDate()}/${student["dob"].getMonth()}/${student[
        "dob"
      ].getFullYear()}`,
      `${toWord.convert(student["dob"].getDate())} ${toWord.convert(
        student["dob"].getMonth()
      )} ${toWord.convert(student["dob"].getFullYear())}`,
      student["nationality"],
      student["religion"],
      `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      student["admissionclass"],
      student["standard"],
      `${toWord.convert(parseInt(student["standard"]))}`,
      Examresult,
      lastpaiddues,
      FeeConcession,
      activites,
      GeneralConduct,
      ReasonforLeaving,
      Remarks
    );
    const certificate = await generateCertificate(svg, 850, 1200, "");
    student["status"] = false;
    student.save();
    return res.status(200).send(certificate);
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

const generateBonafide = AsyncHandeller(async (req, res) => {
  try {
    const StudentId = req.params.student;
    const schoolId = req.params.school;

    const student = await Student.findOne({
      $and: [{ enroll: StudentId }, { school: schoolId }],
    });
    if (student == null) {
      throw new ApiError(404, "no student found");
    }
    const school = await School.findOne({
      school: schoolId.toLowerCase().trim(),
    });
    console.log(student);
    console.log(school);
    if (school == null) {
      throw new ApiError(404, "no school found");
    }
    const date = new Date();
    console.log(school["establish"]);
    console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    const svg = bonafide(
      school["school"].toUpperCase(),
      school["address"],
      `${school["establish"].getFullYear()}-${school[
        "establish"
      ].getMonth()}-${school["establish"].getDate()}`,
      school["center"],
      school["Taluka"],
      school["district"],
      school["contact"],
      school["mail"],
      school["UDiseCode"],
      school["Medium"],
      student["GRNo"],
      student["aadhar"],
      student["enroll"],
      student["name"],
      student["mothername"],
      student["nationality"],
      student["mothertoungue"],
      student["religion"],
      student["caste"],
      student["placeofbrith"],
      `${student["dob"].getDate()}/${student["dob"].getMonth()}/${student[
        "dob"
      ].getFullYear()}`,
      student["standard"],
      `${student["createdAt"].getFullYear()}-${student[
        "createdAt"
      ].getMonth()}-${student["createdAt"].getDate()}`,
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    );
    const certificate = await generateCertificate(
      svg,
      800,
      1100,
      student["photo"]
    );
    res.status(200).send(certificate);
  } catch (error) {
    console.log("Error := ", error);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

export {
  admission,
  removestudent,
  listStudent,
  Studentmarks,
  generateLC,
  generateBonafide,
};
