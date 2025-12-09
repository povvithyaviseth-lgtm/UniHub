import express from 'express';
import { registerStudent, loginStudent } from '../controllers/student.controller.js';

const router = express.Router();

// SIGNUP
router.post('/signup', registerStudent);

// ⭐ LOGIN ROUTE
router.post('/login', loginStudent);

export default router;