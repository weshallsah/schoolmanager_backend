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
    religion: {
      type: String,
      require: true,
    },
    caste: {
      type: String,
      require: true,
    },
    admissionclass: {
      type: String,
      require: true,
    },
    serial: {
      type: String,
      require: true,
    },
    GRNo: {
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
      type: Number,
    },
    dob: {
      type: Date,
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
    standard: {
      type: Number,
      default: 1,
    },
    division: {
      type: String,
      default: "A",
    },
    placeofbrith: {
      type: String,
    },
    trem: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
