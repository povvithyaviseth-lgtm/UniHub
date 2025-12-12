import AuthService from '../services/auth.service.js';
import student from '../models/student.model.js';
import mongoose from 'mongoose';

export const registerStudent = async (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    await AuthService.studentSignUp(email, password);
    res.status(201).json({ message: 'Student registered successfully! Please Log In.' });
  } catch (error) {
    console.error('Error in registerStudent:', error.message);

    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'Email already registered' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body; 
  try {
    const result = await AuthService.studentLogin(email, password); 
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  const students = await student.find({});
  return res.json(students);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Student Id" });
  }
  try {
    const deletedStudent = await student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateStudentRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ success: false, message: 'Role is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Student Id" });
  }

  try {
    const updated = await student.findByIdAndUpdate(
      id,
      { $set: { role } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.status(200).json({ success: true, message: 'Role updated', student: updated });
  } catch (error) {
    console.error('Error updating role:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const checkUserExists = async (req, res) => {
  const exist = await student.findOne({ email: req.params.email });
  if (exist) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
};