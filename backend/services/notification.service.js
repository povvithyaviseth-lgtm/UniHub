import Notification from "../models/notification.model.js";

export const createNotification = async ({ clubId, message, createdBy, type }) => {
  return await Notification.create({
    clubId,
    message,
    createdBy,
    type,
  });
};

export const getNotificationsByClub = async (clubId) => {
  return await Notification.find({ clubId }).sort({ createdAt: -1 });
};

export const markAsRead = async ({ notificationId, studentId }) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    { $addToSet: { readBy: studentId } },
    { new: true }
  );
};