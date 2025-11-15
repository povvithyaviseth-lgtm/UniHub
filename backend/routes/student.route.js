//routes connect a specific URL + HTTP method to a specific function
import express from 'express'; 
import { registerStudent } from '../controllers/student.controller.js';

const router = express.Router(); 

router.post('/signup', registerStudent); 

export default router; 