import {
  createAnnouncement as createAnnouncementSvc,
  getAnnouncementsByClub as getAnnouncementsByClubSvc,
  updateAnnouncement as updateAnnouncementSvc,
  deleteAnnouncement as deleteAnnouncementSvc
} from "../services/announcement.service.js";

/** CREATE announcement */
export async function createAnnouncement(req, res) {
  try {
    console.log("📌 Incoming Payload:", req.body);
    const { clubId, createdBy, title = "", body = "" } = req.body;

    if (!title.trim()) {
      return res.status(400).json({ error: "Announcement title is required" });
    }

    const announcement = await createAnnouncementSvc({
      clubId,
      createdBy,
      title,
      body,
    });

    return res.status(201).json(announcement);

  } catch (err) {
    return handleError(res, err);
  }
}

/** GET announcements for a club */
export async function getAnnouncementsByClub(req, res) {
  try {
    const announcements = await getAnnouncementsByClubSvc(req.params.clubId);
    return res.json(announcements);
  } catch (err) {
    return handleError(res, err);
  }
}

/** UPDATE announcement */
export async function updateAnnouncement(req, res) {
  try {
    const result = await updateAnnouncementSvc(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return handleError(res, err);
  }
}

/** DELETE announcement */
export async function deleteAnnouncement(req, res) {
  try {
    await deleteAnnouncementSvc(req.params.id);
    return res.json({ message: "Announcement deleted" });
  } catch (err) {
    return handleError(res, err);
  }
}

/* helpers */
function handleError(res, err) {
  const msg = err?.message || "Server error";
  const status = /not found|invalid/i.test(msg) ? 404 : 400;
  return res.status(status).json({ error: msg });
}