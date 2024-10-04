import mongoose from "mongoose";

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
      type: Boolean,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
