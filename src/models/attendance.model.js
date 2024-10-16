import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    Date: {
      type: String,
      unique: true,
    },
    school:{
      type:String,
      require:true,
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
