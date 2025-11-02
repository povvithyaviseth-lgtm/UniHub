import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/admins", adminRoutes);

app.listen(5000, () => 
    {
        console.log("Server started at http://localhost:5000");
    });