import React from "react";

/**
 * @typedef {Object} Announcement
 * @property {string} _id
 * @property {string} clubId
 * @property {string} createdBy
 * @property {string} title
 * @property {string} body
 * @property {string} createdAt - ISO string
 */

// API configuration - replace with your backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

const AnnouncementModal = ({
  announcement = null,
  clubId,
  userId,
  onSave = () => {},
  onClose = () => {},
}) => {
  const [title, setTitle] = React.useState(announcement?.title || "");
  const [body, setBody] = React.useState(announcement?.body || "");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        body: body.trim(),
      });
    } catch (error) {
      console.error("Failed to save announcement:", error);
      alert("Failed to save announcement. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(92vw, 700px)",
          maxHeight: "min(92vh, 800px)",
          background: "white",
          borderRadius: 15,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0,0,0,.25)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcement-modal-title"
      >
        <div
          style={{
            background: "#00550A",
            minHeight: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 16px",
          }}
        >
          <h2
            id="announcement-modal-title"
            style={{
              margin: 0,
              color: "white",
              fontWeight: 700,
              fontSize: "clamp(24px, 6vw, 32px)",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            {announcement ? "Edit Announcement" : "Create New Announcement"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "auto" }}>
          <div style={{ padding: 20, display: "grid", rowGap: 18 }}>
            <div style={{ display: "grid", rowGap: 8 }}>
              <label htmlFor="announcement-title" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
                Title
              </label>
              <div style={{ border: "1.5px #EEEEEE solid", borderRadius: 10, height: 50, display: "flex", alignItems: "center", padding: "0 10px" }}>
                <input
                  id="announcement-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  required
                  disabled={isSubmitting}
                  style={{ width: "100%", height: 36, border: "none", outline: "none", fontWeight: 700, fontSize: 17, color: "#2A2A2A", background: "transparent" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", rowGap: 8 }}>
              <label htmlFor="announcement-body" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
                Message
              </label>
              <div style={{ border: "1.5px #EEEEEE solid", borderRadius: 10, minHeight: 120, padding: "8px 10px" }}>
                <textarea
                  id="announcement-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter announcement message"
                  rows={6}
                  disabled={isSubmitting}
                  style={{ width: "100%", border: "none", outline: "none", resize: "vertical", fontWeight: 700, fontSize: 17, color: "#2A2A2A", background: "transparent" }}
                />
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "#EEEEEE", margin: "0 20px 12px 20px" }} />

          <div style={{ display: "flex", gap: 12, justifyContent: "space-between", padding: "0 20px 20px 20px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{ width: 199, height: 55, borderRadius: 8, background: "#E1E1E3", color: "#6B6767", fontSize: 24, fontWeight: 700, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ width: 209, height: 53, borderRadius: 8, fontSize: 24, background: "#00550A", color: "white", fontWeight: 700, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.6 : 1 }}
            >
              {isSubmitting ? "Saving..." : (announcement ? "Save Changes" : "Create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(announcement._id);
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete announcement. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: 15,
        boxShadow: "0 21px 30px rgba(0,0,0,0.17)",
        padding: 24,
        borderLeft: "8px solid #00550A",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 32,
          fontWeight: 700,
          color: "black",
          lineHeight: 1.2,
        }}
      >
        {announcement.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 400,
          color: "black",
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
        }}
      >
        {announcement.body}
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            background: "#DC2626",
            color: "white",
            fontWeight: 700,
            fontSize: 21,
            padding: "12px 32px",
            borderRadius: 8,
            border: "none",
            cursor: isDeleting ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            opacity: isDeleting ? 0.6 : 1,
          }}
          onMouseEnter={(e) => !isDeleting && (e.target.style.background = "#B91C1C")}
          onMouseLeave={(e) => (e.target.style.background = "#DC2626")}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => onEdit(announcement)}
          disabled={isDeleting}
          style={{
            background: "#00550A",
            color: "white",
            fontWeight: 700,
            fontSize: 21,
            padding: "12px 32px",
            borderRadius: 8,
            border: "none",
            cursor: isDeleting ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
            opacity: isDeleting ? 0.6 : 1,
          }}
          onMouseEnter={(e) => !isDeleting && (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Edit Post
        </button>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div
      style={{
        width: 290,
        background: "white",
        flexShrink: 0,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 36,
          fontWeight: 700,
          color: "black",
          textAlign: "center",
        }}
      >
        Welcome
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: 400,
          color: "#707070",
          textAlign: "center",
        }}
      >
        Manage your club
      </p>

      <div style={{ height: 1, background: "#B7B7B7", margin: "8px 0" }} />

      <div style={{ display: "grid", gap: 16 }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#707070" }}>
          Navigation
        </p>
        <button
          style={{
            background: "rgba(0,85,10,0.56)",
            color: "white",
            fontWeight: 700,
            fontSize: 17,
            padding: "12px 16px",
            borderRadius: 5,
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          Manage Club 
        </button>
      </div>

      <div style={{ height: 1, background: "#B7B7B7", margin: "8px 0" }} />

      <div style={{ display: "grid", gap: 16 }}>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#707070" }}>
          Events and Notification
        </p>
        <div
          style={{
            background: "#00550A",
            color: "white",
            fontWeight: 700,
            fontSize: 17,
            padding: "12px 16px",
            borderRadius: 5,
          }}
        >
          Announcements 
        </div>
        <button
          style={{
            background: "rgba(0,85,10,0.56)",
            color: "white",
            fontWeight: 700,
            fontSize: 17,
            padding: "12px 16px",
            borderRadius: 5,
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          Events 
        </button>
      </div>

      <button
        style={{
          fontSize: 18,
          color: "#707070",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          marginTop: 16,
          textAlign: "center",
        }}
      >
        &lt; Back to Website
      </button>
    </div>
  );
};

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
const [clubId] = React.useState("692e33da8351a2554a468208");
const [userId] = React.useState("6913b724892b63bd6c62b8d3");

  // Fetch announcements on component mount
  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API_URL}/announcements/club/${clubId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        // Keep empty array or show error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [clubId]);

  const handleCreateAnnouncement = async (data) => {
    const newAnnouncement = {
      clubId,
      createdBy: userId,
      ...data,
    };
    try {
      const response = await fetch(`${API_URL}/announcements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnnouncement),
      });
      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }
      const createdAnnouncement = await response.json();
      setAnnouncements([createdAnnouncement, ...announcements]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create announcement:", error);
      throw error; // Re-throw to be handled by modal
    }
  };

  const handleEditAnnouncement = async (data) => {
    if (!editingAnnouncement) return;
    try {
      const response = await fetch(`${API_URL}/announcements/${editingAnnouncement._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update announcement");
      }
      const updatedData = await response.json();
      setAnnouncements(
        announcements.map((a) =>
          a._id === editingAnnouncement._id ? updatedData : a
        )
      );
      setEditingAnnouncement(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update announcement:", error);
      throw error; // Re-throw to be handled by modal
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    const response = await fetch(`${API_URL}/announcements/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete announcement");
    }
    setAnnouncements(announcements.filter((a) => a._id !== id));
  };

  const handleOpenEditModal = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F6F6F6",
        display: "flex",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, padding: 32 }}>
        <div style={{ maxWidth: 1200 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 48,
                  fontWeight: 700,
                  color: "black",
                  lineHeight: 1.1,
                }}
              >
                Club Management Console
              </h1>
              <h2
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#707070",
                  lineHeight: 1.1,
                }}
              >
                Announcements
              </h2>
            </div>
            <button
              onClick={handleOpenCreateModal}
              style={{
                background: "#00550A",
                color: "white",
                fontWeight: 700,
                fontSize: 17,
                padding: "12px 24px",
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Create New Announcement
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {isLoading ? (
              <div
                style={{
                  background: "white",
                  borderRadius: 15,
                  boxShadow: "0 21px 30px rgba(0,0,0,0.17)",
                  padding: 48,
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, fontSize: 20, color: "#707070" }}>
                  Loading announcements...
                </p>
              </div>
            ) : announcements.length === 0 ? (
              <div
                style={{
                  background: "white",
                  borderRadius: 15,
                  boxShadow: "0 21px 30px rgba(0,0,0,0.17)",
                  padding: 48,
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, fontSize: 20, color: "#707070" }}>
                  No announcements yet. Create your first announcement!
                </p>
              </div>
            ) : (
              announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  announcement={announcement}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteAnnouncement}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AnnouncementModal
          announcement={editingAnnouncement}
          clubId={clubId}
          userId={userId}
          onSave={editingAnnouncement ? handleEditAnnouncement : handleCreateAnnouncement}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}