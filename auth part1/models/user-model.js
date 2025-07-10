import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minLength: 6},
    isVerified: {type: Boolean, default: false},
    role: {type: String, enum: ['user', 'admin'], default: "user"},
    verificationToken: String,
    verificationTokenExpiry: Date,

}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;