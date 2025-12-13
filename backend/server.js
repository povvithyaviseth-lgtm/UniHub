import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';  
import { connectDB } from './config/db.js';

import clubsRoutes from './routes/club.route.js';
import studentRoutes from './routes/student.route.js';
import adminRoutes from './routes/admin.route.js';
import membershipRoutes from './routes/membership.route.js';
import eventsRoutes from './routes/event.route.js';
import announcementRoutes from './routes/announcement.route.js';
import notificationRoutes from './routes/notification.route.js';
import rsvpRoutes from "./routes/rsvp.route.js";

import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//dotenv.config();
dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();
app.use(express.json());

// Simple, robust CORS: reflect the request origin and allow credentials.
// This will set `Access-Control-Allow-Origin` to the request's Origin header
// which is suitable for development and controlled deployments.
app.use(cors({ origin: true, credentials: true }));

// Lightweight preflight responder: set common CORS headers and short-circuit OPTIONS.
app.use((req, res, next) => {
	const origin = req.headers.origin || '*';
	res.setHeader('Access-Control-Allow-Origin', origin);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
	res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}

	next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/clubs', clubsRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/rsvps", rsvpRoutes);
// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
