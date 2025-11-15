import admin from '../models/admin.models.js';

export const adminData = async (req, res) => {
  const admins = await admin.find({});
  return res.json(admins);
}