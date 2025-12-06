// backend/middleware/multer.middleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Folder where we want to store club images on disk:
// backend/images/club/
const uploadDir = path.join(process.cwd(), 'images', 'club');

// Make sure the folder exists
fs.mkdirSync(uploadDir, { recursive: true });

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('🔥 Multer destination called, saving to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use slug from the form data if provided
    const rawSlug = req.body?.slug || `club-${Date.now()}`;
    // Extra safety: sanitize slug for filesystem
    const safeSlug = rawSlug.toString().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const filename = `${safeSlug}.png`; // you're enforcing PNG on the frontend
    console.log('🔥 Multer filename called, using filename:', filename, 'req.body =', req.body);
    cb(null, filename);
  },
});

// Create the upload middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

export default upload;
