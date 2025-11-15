import express from 'express'; 
import { registerStudent } from '../controller/studentController.js';

const router = express.Router(); 

router.post('/signup', registerStudent); 

export default router; 