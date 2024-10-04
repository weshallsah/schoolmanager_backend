import { Student } from "../models/student.model.js";
import { AsyncHandeller } from "../utils/AsyncHandeller.utils.js";

const admission = AsyncHandeller(async (req, res) => {
  try {
    const { name, enroll, school, fathername, mothername, phone, age, gender } =
      await req.body;
    const student = await Student.create({
      name,
      enroll,
      fathername,
      mothername,
      age,
      phone,
      gender,
      school,
    });
    console.log(student);
    return res.status(200).send({
      student: student,
    });
  } catch (error) {
    console.log("error := ", error);
    return res.status(500).send({
      error: error,
    });
  }
});

const removestudent = AsyncHandeller(async (req, res) => {
  try {
    const enroll = req.params.enroll;
    // console.log(enroll);
    const student = await Student.findOneAndUpdate(
      { enroll: enroll },
      { status: false }
    );
    return res.status(200).json({
      Student: student,
      Status: student.status,
    });
  } catch (error) {
    console.log("error := ", error);
    return res.status(500).json({
      error: error,
    });
  }
});

export { admission, removestudent };
