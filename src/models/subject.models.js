import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  standard: {
    type: Number,
    require: true,
  },
  subjects: [
    {
      type: String,
      require: true,
    },
  ],
});

export const Subject = mongoose.model("Subject", subjectSchema);
