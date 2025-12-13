import Announcement from "../models/announcement.model.js";

export const createAnnouncement = async ({ clubId, createdBy, title, body }) => {
  return await Announcement.create({
    club: clubId,
    createdBy,
    title,
    body,
  });
};

export const getAnnouncementsByClub = async (clubId) => {
  return await Announcement.find({club: clubId }).sort({ createdAt: -1 });
};

export const getAnnouncement = async (id) => {
  return await Announcement.findById(id);
};

export const updateAnnouncement = async (id, data) => {
  return await Announcement.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAnnouncement = async (id) => {
  return await Announcement.findByIdAndDelete(id);
};