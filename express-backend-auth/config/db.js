import mongoose from "mongoose";

export const connectDB = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e.name, " -> Something went wrong, Databse not connected");
  }
};
