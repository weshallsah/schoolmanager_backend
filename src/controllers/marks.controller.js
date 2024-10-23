import mongoose from "mongoose";
import { Mark } from "../models/Marks.models.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Student } from "../models/student.model.js";
import { Feedback } from "../models/Feedback.models.js";
import { generateCertificate } from "./generate.controller.js";
import { progress } from "../../public/svg/progress.js";

const uploadmarks = AsyncHandeller(async (req, res) => {
  try {
    const { student, teacher, tream, standard, subject, marks } = req.body;
    let payload = await Mark.findOne({
      $and: [
        { student: new mongoose.Types.ObjectId(student) },
        { tream: tream },
        { standard: standard },
      ],
    });
    console.log(payload);
    const year = new Date();
    if (payload != null) {
      payload["marks"] = JSON.parse(marks);
      payload["progress"] = false;
      payload.save();
    } else {
      payload = await Mark.create({
        student: new mongoose.Types.ObjectId(student),
        teacher: new mongoose.Types.ObjectId(teacher),
        tream,
        subject,
        year: year.getFullYear(),
        standard,
        marks: JSON.parse(marks),
      });
    }
    let mark = payload["marks"];
    console.log(mark);
    let markobtain = 0;
    for (let i = 0; i < mark.length; i++) {
      markobtain += mark[i];
    }
    console.log(markobtain);
    console.log(mark.length);
    const percent = (markobtain / (mark.length * 100)) * 100;
    const newtrem = tream == "1" ? 2 : 1;
    const newstandard = tream == "2" ? 2 : standard;
    console.log(newtrem);
    console.log(newstandard);
    if (percent > 35) {
      const user = await Student.findByIdAndUpdate(student, {
        trem: newtrem,
        standard: newstandard,
      });
      user.save();
    }
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "Marrks uploaded sucessful"));
  } catch (error) {
    console.log(`error := ${error}`);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

const generate = AsyncHandeller(async (req, res) => {
  try {
    let { marks, feedbacks } = req.body;
    const mark = await Mark.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(marks) },
      { progress: true }
    );
    marks = mark._id;
    let payload = await Feedback.findOne({ marks });
    // console.log(isexist);
    if (payload != null) {
      payload["feedbacks"] = feedbacks;
      // throw new ApiError(400, "certificate alredy generated");
      // console.log(payload);
      payload.save();
    } else {
      payload = await Feedback.create({ feedbacks, marks });
    }
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          payload,
        },
        "progress card generated"
      )
    );
  } catch (error) {
    console.log("Error := ", error);
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

const generateprogress = AsyncHandeller(async (req, res) => {
  try {
    const { markID, tream } = req.body;
    // const marks = await Mark.findById(markID);
    console.log(markID);
    console.log(tream);
    let marks = await Mark.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(markID),
          tream: parseInt(tream),
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "student",
          foreignField: "_id",
          as: "result",
          pipeline: [
            {
              $project: {
                name: 1,
                standard: 1,
                school: 1,
                enroll: 1,
                division: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$result",
      },
      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "marks",
          as: "feedback",
          pipeline: [
            {
              $project: {
                feedbacks: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$feedback",
      },
      {
        $project: {
          tream: 1,
          subject: 1,
          marks: 1,
          name: "$result.name",
          school: "$result.school",
          enroll: "$result.enroll",
          standard: "$result.standard",
          division: "$result.division",
          feedback: "$feedback.feedbacks",
        },
      },
    ]);
    if (marks == null) {
      throw new ApiError(404, "Progress card not found");
    }
    console.log(marks);
    marks[0]["subject"] = JSON.parse(marks[0]["subject"][0]);
    marks[0]["feedback"] = JSON.parse(marks[0]["feedback"][0]);
    const svg = progress(
      marks[0]["name"],
      marks[0]["enroll"],
      marks[0]["school"].toUpperCase(),
      marks[0]["standard"],
      marks[0]["division"],
      marks[0]["subject"],
      marks[0]["marks"],
      marks[0]["feedback"]
    );
    const card = await generateCertificate(svg, 595, 842, "");
    console.log(card);
    return res.status(200).send(card);
  } catch (error) {
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

const getmarks = AsyncHandeller(async (req, res) => {
  try {
    const std = req.params.std;
    const teacher = req.params.id;
    console.log(std);
    console.log(teacher);
    const payload = await Mark.aggregate([
      {
        $match: {
          standard: parseInt(std),
          teacher: new mongoose.Types.ObjectId(teacher),
        },
      },
    ]);
    console.log(payload);
    return res
      .status(200)
      .json(new ApiResponse(200, payload, "Marks is fetched"));
  } catch (error) {
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message));
  }
});

export { uploadmarks, generate, generateprogress, getmarks };
