import mongoose from 'mongoose';
import admin from '../models/admin.model.js';
import bcrypt from 'bcryptjs';


export const adminData = async (req, res) => {
  const admins = await admin.find({});
  return res.json(admins);
}