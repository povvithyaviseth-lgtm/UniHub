import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';  
import { connectDB } from './config/db.js';

import clubsRoutes from './routes/club.route.js';
import studentRoutes from './routes/student.route.js';
import adminRoutes from './routes/admin.route.js';
import membershipRoutes from './routes/membership.route.js';

import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Simple, robust CORS: reflect the request origin and allow credentials.
// This will set `Access-Control-Allow-Origin` to the request's Origin header
// which is suitable for development and controlled deployments.
app.use(cors({ origin: true, credentials: true }));
// Ensure preflight requests are handled
app.options('*', cors({ origin: true, credentials: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/clubs', clubsRoutes);
app.use('/api/clubs', membershipRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
