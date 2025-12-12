//routes connect a specific URL + HTTP method to a specific function
import express from 'express'; 
import { registerStudent, loginStudent, checkUserExists } from '../controllers/student.controller.js';

const router = express.Router(); 

router.post('/signup', registerStudent); 
router.post('/login', loginStudent);
router.get('/exists/:email', checkUserExists);

export default router; 