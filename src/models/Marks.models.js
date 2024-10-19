import mongoose from "mongoose";

const markSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    tream: {
      type: Number,
      require: true,
    },
    progress: {
      type: Boolean,
      default: false,
    },
    subject: [
      {
        type: String,
        require: true,
      },
    ],
    standard: {
      type: Number,
    },
    year: {
      type: String,
      require: true,
    },
    marks: [
      {
        type: Number,
        require: true,
      },
    ],
  },
  { timestamps: true }
);

export const Mark = mongoose.model("Mark", markSchema);
