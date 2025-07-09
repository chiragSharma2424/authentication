import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const db = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("database connected successfully");
    }).catch((err) => {
        console.log(`error connecting db ${err}`);
    })
}