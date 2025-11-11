//routes connect a specific URL + HTTP method to a specific function
import express from 'express'; 
import { registerStudent } from '../controller/studentController.js';

const router = express.Router(); 

router.post('/signup', registerStudent); 

export default router; 