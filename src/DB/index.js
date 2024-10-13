import mongoose from "mongoose";
import { DBname } from "../contents/DB.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.URL}/${DBname}?retryWrites=true&w=majority`
    );
    console.log("DB is connected");
  } catch (error) {
    console.log(`DB connection error :- ${error}`);
  }
};
