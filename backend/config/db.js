import mongoose from "mongoose";

export const connectDB = async () => {
    try 
    {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } 
    catch (error) 
    {
        console.error(`Error: ${error.message}`);
        // Exit the process with failure code. Do not continue when DB connection fails.
        process.exit(1);
    }
};