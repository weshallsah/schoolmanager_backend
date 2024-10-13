import mongoose from "mongoose";
import bcrypt, { compare } from "bcrypt";

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
  password: {
    type: String,
    require: true,
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
  school: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

teacherSchema.pre("save", async function (err, req, res, next) {
  if (!this.isModified("password")) {
    return next;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next;
});

teacherSchema.methods.ispasswordCorrect = async function (password) {
  console.log(await bcrypt.compare(password, this.password));
  return await bcrypt.compare(password, this.password);
};

export const Teacher = mongoose.model("Teacher", teacherSchema);
