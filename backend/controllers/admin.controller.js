import mongoose from 'mongoose';
import admin from '../models/admin.model.js';

export const adminData = async (req, res) => {
  const admins = await admin.find({});
  return res.json(admins);
}