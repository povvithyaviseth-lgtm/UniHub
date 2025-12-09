import Notification from "../models/notification.model.js";

export const getNotificationsForStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    const notifications = await Notification.find({ student: studentId })
      .sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error fetching notifications" });
  }
};
export const markNotificationRead = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { id } = req.params;

    await Notification.findOneAndUpdate(
      { _id: id, student: studentId },
      { checked: true }
    );

    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("Error marking notification read:", err);
    res.status(500).json({ message: "Server error updating notification" });
  }
};