import mongoose, { Types } from "mongoose";

const schoolSchema = mongoose.Schema(
  {
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
    center: {
      type: String,
      require: true,
    },
    Taluka: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    mail: {
      type: String,
      require: true,
    },
    Medium: {
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
    grno: {
      type: Number,
      default: 0,
    },
    establish: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const School = mongoose.model("School", schoolSchema);
