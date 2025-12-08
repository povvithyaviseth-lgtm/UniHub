import mongoose from 'mongoose';
import admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';

export const adminData = async (req, res) => {
  const admins = await admin.find({});
  return res.json(admins);
}

export const addAdmin = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newAdmin = new admin({ email, password: hashedPassword });
    await newAdmin.save();
    return res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error adding admin:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};