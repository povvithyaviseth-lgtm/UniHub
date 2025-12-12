import Notification from "../models/notification.model.js";
import Club from "../models/club.model.js";
import ClubMembership from "../models/membership.model.js";

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
    const clubData = await Club.findById(clubId);
    const members = await ClubMembership.find({ club: clubId }).select("student");
    console.log("MEMBERS:", members);
    

    const notifications = members.map((member) => ({
      student: member.student,
      clubId: clubId,
      createdBy,
      type: "announcement",
      title: `New Announcement: ${title}`,
      clubName:clubData?.name|| "A Club",
        dateTime: new Date().toLocaleString(),
        location: "N/A",
        checked: false,
    }));
        console.log("NOTIFICATIONS TO CREATE:", notifications);
        if (notifications.length > 0) {
            try {
                const inserted = await Notification.insertMany(notifications);
                console.log("Inserted notifications:", inserted);
            } catch (err) {
                console.error("Error inserting notifications:", err);
            }
        } else {
            console.log("No members found, no notifications created.");
        }   

    res.status(201).json({ announcement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*export const getAnnouncementsController = async (req, res) => {
  try {
    const { clubId } = req.params;
    console.log("📌 getAnnouncementsController called with clubId:", clubId);

    const announcements = await getAnnouncementsByClub(clubId);
    

    res.json({ announcements });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/
    
export const getAnnouncementsController = async (req, res) => {
  try {
    const { clubId } = req.params;
    console.log("📌 getAnnouncementsController called with clubId:", clubId);
    
    const announcements = await getAnnouncementsByClub(clubId);

    res.json({ announcements });
    } catch (err) {
console.error("❌ Error in getAnnouncementsController:", err);
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