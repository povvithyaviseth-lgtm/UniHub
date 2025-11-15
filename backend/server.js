import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend requests
app.use(cors({
    // CHANGE ME TO: origin: 'http://localhost:5173', // Vite's default port 
    // credentials: true
    origin: '*'
}));

app.use(express.json());

// Add Your Routes Here
app.use("/api/admins", adminRoutes);
app.use("/api/students", studentRoutes);


// End of Your Routes Here

// 404 handler
app.use((req, res) => {
    console.log(`404 - Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.url} not found` });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});