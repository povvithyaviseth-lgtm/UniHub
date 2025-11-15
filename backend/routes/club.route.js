import { Router } from 'express';
import { createClub } from '../controllers/clubManagement.controller.js';

const router = Router();

router.post('/clubs/requests', createClub);

export default router;
