// routes/club.route.js
import express from 'express';
import { createClub, getMyClubs, updateClub, getClubs } from '../controllers/club.controller.js';
import { auth } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('➡️ clubsRoutes hit:', req.method, req.originalUrl);
  next();
});

// POST /api/clubs
router.post('/', auth, upload.single('image'), createClub);
router.get('/mine', auth, getMyClubs);
router.get('/', getClubs);
router.put('/:id', auth, updateClub);
export default router;
