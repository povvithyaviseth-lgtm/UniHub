// routes/club.route.js
import express from 'express';
import { createClub } from '../controllers/club.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/clubs
router.post('/', auth, createClub);

export default router;
