// routes/membership.route.js
import express from 'express';
import { auth } from '../middleware/auth.middleware.js';
import {
  joinClub,
  leaveClub,
  getJoinedClubs,
  getClubMembers, 
  kickMember,
} from '../controllers/membership.controller.js';

const router = express.Router();

// Join / leave a specific club
router.post('/:id/join', auth, joinClub);
router.post('/:id/leave', auth, leaveClub);

// Get all clubs the current student has joined (as member)
router.get('/joined', auth, getJoinedClubs);

router.use((req, res, next) => {
  console.log('➡️ membershipRoutes hit:', req.method, req.originalUrl);
  next();
});

router.get('/:id/members', auth, getClubMembers);
router.delete('/:id/members/:memberId', auth, kickMember);

export default router;
