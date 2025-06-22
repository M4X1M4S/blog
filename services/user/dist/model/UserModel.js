import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    instagram: { type: String, required: false },
    linkedin: { type: String, required: false },
    facebook: { type: String, required: false },
    image: { type: String, required: false },
}, {
    timestamps: true,
});
const User = mongoose.model("User", schema);
export default User;
