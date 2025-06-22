import mongoose, { Document } from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  image: string;
}
const schema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    instagram: { type: String, required: false },
    linkedin: { type: String, required: false },
    facebook: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUser>("User", schema);
export default User;
