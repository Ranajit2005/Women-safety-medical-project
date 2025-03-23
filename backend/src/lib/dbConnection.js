import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {

    if (!process.env.MONGO_URL) {
        console.log("Database is not connected");
    }

    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Error in connecting to database");
        console.log(error);

    }

}