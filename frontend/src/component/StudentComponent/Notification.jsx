import React from "react";

/**
 * @typedef {Object} Notification
 * @property {string} _id
 * @property {string} title
 * @property {string} clubName
 * @property {string} dateTime
 * @property {string} location
 * @property {boolean} checked
 */

const NotificationCard = ({ notification, onToggle, onRsvp }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 8,
        border: "1px solid rgba(136,136,136,0.19)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        position: "relative",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: "black",
            lineHeight: 1.3,
          }}
        >
          {notification.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 700,
            color: "#707070",
            lineHeight: 1.3,
          }}
        >
          {notification.clubName}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 14, color: "#00550A" }}>📅</span>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 400,
              color: "#00550A",
              lineHeight: 1.2,
            }}
          >
            {notification.dateTime}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 14, color: "#00550A" }}>📍</span>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 400,
              color: "#00550A",
              lineHeight: 1.2,
            }}
          >
            {notification.location}
          </p>
        </div>
        {/* RSVP Button */}
{notification.type === "event" && (
  <button
    onClick={() => onRsvp(notification)}
    style={{
      marginTop: 10,
      padding: "8px 14px",
      background: notification.rsvp ? "#16A34A" : "#00550A",
      color: "white",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 14,
    }}
  >
    {notification.rsvp ? "Going ✓" : "RSVP"}
  </button>
)}
      </div>

      <div
        onClick={() => onToggle(notification._id)}
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          border: notification.checked ? "none" : "2px solid #6750A4",
          background: notification.checked ? "#6750A4" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
        role="checkbox"
        aria-checked={notification.checked}
        tabIndex={0}
        /*onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(notification.id);
          }
        }}*/
       onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onToggle(notification._id);  // ✔ correct
  }
}}
      >
        {notification.checked && (
          <span style={{ color: "white", fontSize: 16, lineHeight: 1 }}>✓</span>
        )}
      </div>
    </div>
  );
};

const NotificationPopup = ({ isOpen, onClose, notifications, onToggle,onRsvp }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
        paddingTop: 60,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(92vw, 400px)",
          maxHeight: "min(85vh, 600px)",
          background: "white",
          borderRadius: 13,
          border: "2px solid #00550A",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0,0,0,.25)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-popup-title"
      >
        <div
          style={{
            padding: "20px 16px",
            borderBottom: "3px solid #E4E4E4",
          }}
        >
          <h2
            id="notification-popup-title"
            style={{
              margin: 0,
              color: "black",
              fontWeight: 700,
              fontSize: 35,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Notifications
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {notifications.length === 0 ? (
            <div
              style={{
                padding: 48,
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 16, color: "#707070" }}>
                No notifications at this time.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onToggle={onToggle}
                onRsvp={onRsvp}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationButton = ({ onClick, notificationCount }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={onClick}
        style={{
          background: "#00550A",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "10px 16px",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
        aria-label={`Notifications (${notificationCount} unread)`}
      >
        <span style={{ fontSize: 20 }}>🔔</span>
        <span>Notifications</span>
      </button>
      {notificationCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            background: "#DC2626",
            color: "white",
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
          }}
          aria-label={`${notificationCount} unread notifications`}
        >
          {notificationCount}
        </div>
      )}
    </div>
  );
};

export default function Notification({ isOpen, onClose }) {
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    if (!isOpen) return;

    async function fetchNotifications() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5050/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data.notifications || []);
    }

    fetchNotifications();
  }, [isOpen]);

  const handleToggle = async (id) => {
    
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5050/api/notifications/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });


    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, checked: true } : n))
    );
  };
  // ⭐ RSVP Function (NOT inside handleToggle)
const onRsvp = async (notification) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5050/api/rsvps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      eventId: notification.eventId,
    }),
  });

  const data = await res.json();
  console.log("RSVP submitted:", data);

  setNotifications((prev) =>
    prev.map((n) =>
      n._id === notification._id ? { ...n, rsvp: true } : n
    )
  );
};

  return (
  <NotificationPopup
    isOpen={isOpen}
    onClose={onClose}
    notifications={notifications}
    onToggle={handleToggle}
    onRsvp={onRsvp}   // ⭐ ADD THIS
  />
);
}