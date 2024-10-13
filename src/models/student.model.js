import mongoose, { Types } from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    school: {
      type: String,
      require: true,
    },
    photo: {
      type: mongoose.Types.ObjectId,
    },
    enroll: {
      type: String,
      require: true,
      unique: true,
    },
    fathername: {
      type: String,
    },
    mothername: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: Number,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    mothertoungue: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    nationality: {
      type: String,
    },
    placeofbrith: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
