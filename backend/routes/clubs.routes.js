import { Router } from 'express';
import { createClub } from '../controller/clubmanagementController.js';

const router = Router();

router.post('/clubs/requests', createClub);

export default router;
