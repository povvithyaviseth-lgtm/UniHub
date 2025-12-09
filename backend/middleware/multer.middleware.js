// backend/middleware/multer.middleware.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility: ensure folder exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "club"; // default

    // If the route begins with /api/events, we store in event folder
    if (req.baseUrl.includes("/api/events")) {
      folder = "event";
    }

    const uploadDir = path.join(__dirname, "..", "images", folder);
    ensureDir(uploadDir);

    console.log("🔥 Multer destination called, saving to:", uploadDir);
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    // --- SAME NAMING CONVENTION AS BEFORE ---
    // CLUBS → use slug
    // EVENTS → auto-prefix "event-<timestamp>"

    let rawSlug;

    if (req.baseUrl.includes("/api/clubs")) {
      // Clubs require slug (your frontend sends this)
      rawSlug = req.body?.slug || `club-${Date.now()}`;
    } else if (req.baseUrl.includes("/api/events")) {
      // Events do NOT use slug, they get auto-generated names
      rawSlug = `event-${Date.now()}`;
    } else {
      rawSlug = `file-${Date.now()}`;
    }

    // Sanitize
    const safeSlug = rawSlug
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-");

    const filename = `${safeSlug}.png`; // YOU enforce PNG in frontend
    console.log("🔥 Multer filename called →", filename, " body:", req.body);

    cb(null, filename);
  },
});

// Create the upload middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
