import mongoose, { Types } from "mongoose";

const schoolSchema = mongoose.Schema({
  school: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  Affiliated: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  AffiliationNo: {
    type: String,
    require: true,
  },
  UDiseCode: {
    type: String,
    require: true,
  },
  SchoolCode: {
    type: String,
    require: true,
  },
  establish: {
    type: Number,
    require: true,
  },
});

export const School = mongoose.model("School", schoolSchema);
