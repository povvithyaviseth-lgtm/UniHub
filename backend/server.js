import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/student.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
// add clubs if you have them
// import clubsRoutes from "./routes/club.routes.js";

dotenv.config({ path: "./backend/.env" });
connectDB();

const app = express();
app.use(express.json());

// ---- CORS + Preflight (robust + flexible for dev) ----
const isDevLocal = (origin) => {
  if (!origin) return true; // tools or same-origin
  try {
    const u = new URL(origin);
    const isLocalhost = u.hostname === "localhost" || u.hostname === "127.0.0.1";
    return isLocalhost && u.protocol === "http:"; // allow localhost ports in dev
  } catch {
    return false;
  }
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`[${req.method}] ${req.path}  Origin=${origin || "none"}`);

  if (isDevLocal(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    const reqMethod = req.headers["access-control-request-method"];
    const reqHeaders = req.headers["access-control-request-headers"];

    res.setHeader(
      "Access-Control-Allow-Methods",
      reqMethod ? reqMethod : "GET,POST,PUT,DELETE,OPTIONS,PATCH"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      reqHeaders ? reqHeaders : "Content-Type, Authorization"
    );
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
// ------------------------------------------------------------

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/announcements", announcementRoutes);
// if you have clubs: app.use("/api", clubsRoutes);

app.get("/", (req, res) => res.send("✅ Backend is running!"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
