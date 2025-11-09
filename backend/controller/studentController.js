import Student from '../models/studentModels.js'
import bcrypt from 'bcryptjs';  // Hashing library 

// Buisness Logic for Sign Up page 
export const registerStudent = async (req, res) => {
    console.log("Request body:", req.body);
    const { email, password } = req.body; 

    try {
        // Check if the user already exists
        const existingStudent = await Student.findOne({ email }); 
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered'
            });
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Create student 
        const newStudent = new Student ({
            email,
            password: hashedPassword, 
        }); 

        await newStudent.save(); 
        res.status(201).json({ message: 'Student registered successfully' }); 
    }   catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server erro' });
    }
};