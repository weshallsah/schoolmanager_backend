import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    Date: {
      type: String,
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
