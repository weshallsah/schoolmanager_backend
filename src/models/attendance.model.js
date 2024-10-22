import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    Date: {
      type: String,
      unique: false,
    },
    school: {
      type: String,
      require: true,
    },
    standard: {
      type: Number,
      require: true,
    },
    present: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { imestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
