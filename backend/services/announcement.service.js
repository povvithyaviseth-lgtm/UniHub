import Announcement from "../models/announcement.model.js";

export async function createAnnouncement(data) {
  return await Announcement.create(data);
}

export async function getAnnouncementsByClub(clubId) {
  return await Announcement.find({ clubId }).sort({ createdAt: -1 });
}

export async function updateAnnouncement(id, data) {
  return await Announcement.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteAnnouncement(id) {
  return await Announcement.findByIdAndDelete(id);
}
