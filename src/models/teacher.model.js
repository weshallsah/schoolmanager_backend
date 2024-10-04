import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  name: {
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
  email: {
    type: String,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
