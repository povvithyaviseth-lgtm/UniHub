import {
  createAnnouncement,
  getAnnouncementsByClub,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcement.service.js";

export const createAnnouncementController = async (req, res) => {
  try {
    //console.log("req.user:", req.user);
    console.log("req.user in createAnnouncementController:", req.user);
    const { clubId } = req.params;
    const { title, body } = req.body;

    const createdBy = req.user.id; // uses your auth middleware

    const announcement = await createAnnouncement({
      clubId,
      createdBy,
      title,
      body,
    });

    res.status(201).json({ announcement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAnnouncementsController = async (req, res) => {
  try {
    const { clubId } = req.params;

    const announcements = await getAnnouncementsByClub(clubId);

    res.json({ announcements });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAnnouncementController = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, body } = req.body;

    const updated = await updateAnnouncement(announcementId, { title, body });

    res.json({ announcement: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAnnouncementController = async (req, res) => {
  try {
    const { announcementId } = req.params;

    await deleteAnnouncement(announcementId);

    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};