import Announcement from "../models/announcement.model.js";
import AuthService from "../services/authService.js";  


/**
 * @desc   Get all announcements
 * @route  GET /api/announcements/data
 * @access Public
 */
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(announcements);
  } catch (error) {
    console.error("❌ Error in getAllAnnouncements:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

/**
 * @desc   Get announcements by club
 * @route  GET /api/announcements/club/:clubId
 * @access Public
 */
export const getAnnouncementsByClub = async (req, res) => {
  const { clubId } = req.params;

  try {
    const announcements = await Announcement.find({ 
      clubId, 
      isActive: true 
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(announcements);
  } catch (error) {
    console.error("❌ Error in getAnnouncementsByClub:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

/**
 * @desc   Create a new announcement
 * @route  POST /api/announcements/create
 * @access Private (Admin/Club Manager)
 */
export const createAnnouncement = async (req, res) => {
  console.log("📨 Request body:", req.body);
  const { title, clubName, description, clubId, createdBy } = req.body;

  // Validate input
  if (!title || !clubName || !description) {
    return res.status(400).json({ 
      message: "Title, club name, and description are required" 
    });
  }

  try {
    const newAnnouncement = new Announcement({
      title,
      clubName,
      description,
      clubId,
      createdBy,
    });

    await newAnnouncement.save();

    res.status(201).json({ 
      success: true,
      message: "✅ Announcement created successfully",
      announcement: newAnnouncement 
    });
  } catch (error) {
    console.error("❌ Error in createAnnouncement:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later." 
    });
  }
};

/**
 * @desc   Update an announcement
 * @route  PUT /api/announcements/edit/:id
 * @access Private (Admin/Club Manager)
 */
export const updateAnnouncement = async (req, res) => {
  console.log("📨 Request body:", req.body);
  const { id } = req.params;
  const { title, clubName, description } = req.body;

  try {
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ 
        success: false,
        message: "Announcement not found" 
      });
    }

    // Update fields
    if (title) announcement.title = title;
    if (clubName) announcement.clubName = clubName;
    if (description) announcement.description = description;

    await announcement.save();

    res.status(200).json({ 
      success: true,
      message: "✅ Announcement updated successfully",
      announcement 
    });
  } catch (error) {
    console.error("❌ Error in updateAnnouncement:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later." 
    });
  }
};

/**
 * @desc   Delete an announcement (soft delete)
 * @route  DELETE /api/announcements/delete/:id
 * @access Private (Admin/Club Manager)
 */
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ 
        success: false,
        message: "Announcement not found" 
      });
    }

    // Soft delete
    announcement.isActive = false;
    await announcement.save();

    res.status(200).json({ 
      success: true,
      message: "✅ Announcement deleted successfully" 
    });
  } catch (error) {
    console.error("❌ Error in deleteAnnouncement:", error.message);
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later." 
    });
  }
};

/**
 * @desc   Get a single announcement by ID
 * @route  GET /api/announcements/:id
 * @access Public
 */
export const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id);

    if (!announcement || !announcement.isActive) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error("❌ Error in getAnnouncementById:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
