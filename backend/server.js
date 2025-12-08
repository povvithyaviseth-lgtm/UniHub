import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';  
import { connectDB } from './config/db.js';

import clubsRoutes from './routes/club.route.js';
import studentRoutes from './routes/student.route.js';
import adminRoutes from './routes/admin.route.js';
import membershipRoutes from './routes/membership.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ---- CORS + Preflight (robust + echo what browser asks) ----
app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Log once so we can see what's hitting the server
  console.log(`[${req.method}] ${req.path}  Origin=${origin || 'none'}`);

  if (isDevLocal(origin)) {
    // Always reflect back the requesting origin for dev
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Echo the requested method/headers for preflight to avoid mismatches
    const reqMethod = req.headers['access-control-request-method'];
    const reqHeaders = req.headers['access-control-request-headers'];

    res.setHeader(
      'Access-Control-Allow-Methods',
      reqMethod ? reqMethod : 'GET,POST,PUT,DELETE,OPTIONS,PATCH'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      reqHeaders ? reqHeaders : 'Content-Type, Authorization'
    );
  }

  // Short-circuit preflight so it never reaches routes/middleware
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
// ------------------------------------------------------------

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
