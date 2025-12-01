// routes/club.route.js
import express from 'express';
import { createClub, getMyClubs, updateClub } from '../controllers/club.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/clubs
router.post('/', auth, createClub);
router.get('/mine', auth, getMyClubs);
router.put('/:id', auth, updateClub);

export default router;
