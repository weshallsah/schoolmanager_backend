import mongoose, { Mongoose } from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    feedbacks: [
      {
        type: String,
        require: true,
      },
    ],
    marks: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
