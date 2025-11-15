import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import clubsRouter from './routes/clubs.routes.js';
import studentRoutes from './routes/studentRoutes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ---- CORS + Preflight (robust + echo what browser asks) ----
const isDevLocal = (origin) => {
  if (!origin) return true; // tools or same-origin
  try {
    const u = new URL(origin);
    const isLocalhost = u.hostname === 'localhost' || u.hostname === '127.0.0.1';
    return isLocalhost && u.protocol === 'http:'; // allow any localhost port in dev
  } catch {
    return false;
  }
};

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

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api', clubsRouter);

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
