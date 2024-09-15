import mongoose from "mongoose";

const conn = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    return;
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default conn;
