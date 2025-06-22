import mongoose from "mongoose";
const connectToDatabase = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    await mongoose.connect(dbUri as string, {
      dbName: "user-service",
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
export default connectToDatabase;
