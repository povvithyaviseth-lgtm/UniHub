import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";

const API_BASE_URL = "http://localhost:5050";

/* ======= CREATE EVENT MODAL (small visual tweaks only) ======= */
function CreateEventModal({ onSave, onCancel }) {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isOnline, setIsOnline] = React.useState(false);
  const [link, setLink] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Event name is required";
    if (!date) newErrors.date = "Date is required";
    if (!startTime) newErrors.startTime = "Start time is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({
      title: title.trim(),
      date,
      startTime,
      endTime: endTime || null,
      location: location.trim(),
      isOnline,
      link: link.trim(),
      capacity: capacity ? Number(capacity) : null,
      description: description.trim(),
      status: "draft",
    });
  };

  return (
    <div
      style={{
        width: "min(92vw, 560px)",
        maxHeight: "min(92vh, 660px)",
        background: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#065F46",
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Create event
        </h2>
        <button
          type="button"
          onClick={onCancel}
          style={{
            border: "none",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "4px 10px",
            color: "#E5E7EB",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 14,
          color: "#111827",
        }}
      >
        {/* Event name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 500 }}>Event name *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Weekly study session"
            style={{
              borderRadius: 12,
              border: errors.title ? "1px solid #DC2626" : "1px solid #D1D5DB",
              padding: "10px 12px",
              fontSize: 14,
            }}
          />
          {errors.title && (
            <span style={{ fontSize: 12, color: "#DC2626" }}>
              {errors.title}
            </span>
          )}
        </div>

        {/* Date & time */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                borderRadius: 12,
                border: errors.date
                  ? "1px solid #DC2626"
                  : "1px solid #D1D5DB",
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
            {errors.date && (
              <span style={{ fontSize: 12, color: "#DC2626" }}>
                {errors.date}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Start *</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                borderRadius: 12,
                border: errors.startTime
                  ? "1px solid #DC2626"
                  : "1px solid #D1D5DB",
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
            {errors.startTime && (
              <span style={{ fontSize: 12, color: "#DC2626" }}>
                {errors.startTime}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontWeight: 500 }}>End</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                borderRadius: 12,
                border: "1px solid #D1D5DB",
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
          </div>
        </div>

        {/* Location / online toggle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <label style={{ fontWeight: 500 }}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Room 204, Science Building"
                style={{
                  borderRadius: 12,
                  border: "1px solid #D1D5DB",
                  padding: "10px 12px",
                  fontSize: 14,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsOnline((prev) => !prev)}
              style={{
                whiteSpace: "nowrap",
                borderRadius: 999,
                border: "1px solid #D1D5DB",
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 500,
                background: isOnline ? "#ECFDF3" : "#F9FAFB",
                color: isOnline ? "#15803D" : "#4B5563",
                cursor: "pointer",
              }}
            >
              {isOnline ? "Online event" : "In-person"}
            </button>
          </div>

          {isOnline && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Join link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Zoom / Meet link"
                style={{
                  borderRadius: 12,
                  border: "1px solid #D1D5DB",
                  padding: "10px 12px",
                  fontSize: 14,
                }}
              />
            </div>
          )}
        </div>

        {/* Capacity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 500 }}>
            Capacity{" "}
            <span style={{ fontWeight: 400, color: "#6B7280" }}>
              (optional)
            </span>
          </label>
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="30"
            style={{
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              padding: "10px 12px",
              fontSize: 14,
              maxWidth: 160,
            }}
          />
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 500 }}>
            Description{" "}
            <span style={{ fontWeight: 400, color: "#6B7280" }}>
              (what should people expect?)
            </span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary of the event..."
            style={{
              resize: "vertical",
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              padding: "10px 12px",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          padding: 14,
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          background: "#F9FAFB",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            borderRadius: 999,
            border: "1px solid #D1D5DB",
            background: "#FFFFFF",
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            color: "#374151",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            borderRadius: 999,
            border: "none",
            background: "#065F46",
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            color: "#FFFFFF",
          }}
        >
          Save event
        </button>
      </div>
    </div>
  );
}

/* ======= MAIN DASHBOARD ======= */
export default function ClubDashboard() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [club, setClub] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [activeTab, setActiveTab] = React.useState("events"); // "events" | "announcements"
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = React.useState(false);

  // NEW: Attendance modal state
  const [showAttendanceModal, setShowAttendanceModal] = React.useState(false);
  const [attendanceEvent, setAttendanceEvent] = React.useState(null);

  const [members, setMembers] = React.useState([
    { id: 1, email: "student1@example.edu" },
    { id: 2, email: "student2@example.edu" },
    { id: 3, email: "student3@example.edu" },
  ]);
  const [confirmKickId, setConfirmKickId] = React.useState(null);

  // mock events
  const [events, setEvents] = React.useState([
    {
      id: 1,
      title: "Welcome mixer",
      date: "2025-09-10",
      startTime: "18:00",
      endTime: "20:00",
      location: "Student Union, Room 101",
      isOnline: false,
      link: "",
      capacity: 40,
      description: "Informal mixer for new members with snacks and games.",
      status: "published",
    },
    {
      id: 2,
      title: "Weekly study session",
      date: "2025-09-15",
      startTime: "16:00",
      endTime: "18:00",
      location: "Library, Group Study Room B",
      isOnline: false,
      link: "",
      capacity: null,
      description: "Drop-in study session hosted by club officers.",
      status: "draft",
    },
  ]);

  // NEW: track attendance per event (eventId -> { [memberId]: boolean })
  const [attendanceByEvent, setAttendanceByEvent] = React.useState({});

  // simple announcements
  const [announcements, setAnnouncements] = React.useState([
    {
      id: 1,
      text: "First meeting this Thursday! Snacks provided.",
      createdAt: "2025-09-01",
      status: "published",
    },
    {
      id: 2,
      text: "Looking for volunteers to help with outreach.",
      createdAt: "2025-09-05",
      status: "draft",
    },
  ]);
  const [newAnnouncement, setNewAnnouncement] = React.useState("");

  // NEW: toggle between upcoming and old events
  const [showOldEvents, setShowOldEvents] = React.useState(false);

  React.useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        // TODO: replace with real backend
        setClub({
          _id: clubId,
          name: "Sample Club Name",
          status: "approved", // or "pending"
          description: "This is a sample description for the club.",
          tag: "Academic, Social",
          imageUrl: "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId]);

  const handleGoBack = () => {
    navigate("/console/clubs");
  };

  const isPending = club?.status === "pending";

  const handleEditSave = (payload) => {
    setClub((prev) =>
      prev
        ? {
            ...prev,
            name: payload.name || prev.name,
            tag: payload.tag ?? prev.tag,
            description: payload.description ?? prev.description,
            imageUrl: payload.imageUrl ?? prev.imageUrl,
          }
        : prev
    );
    setShowEditModal(false);
  };

  const handleKickClick = (memberId) => {
    setConfirmKickId(memberId);
  };

  const handleCancelKick = () => {
    setConfirmKickId(null);
  };

  const handleConfirmKick = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    setConfirmKickId(null);
  };

  const handleCreateEventSave = (payload) => {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...payload,
      },
    ]);
    setShowCreateEventModal(false);
  };

  // single toggle: when draft -> publish (button shows "Post"), when published -> back to draft (button shows "Edit")
  const handleToggleEventStatus = (eventId) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              status: ev.status === "published" ? "draft" : "published",
            }
          : ev
      )
    );
  };

  const handleDeleteEvent = (eventId) => {
    const ok = window.confirm("Delete this event? This cannot be undone.");
    if (!ok) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
  };

  // NEW: Mark attendance handlers
  const handleOpenAttendance = (event) => {
    setAttendanceEvent(event);
    setShowAttendanceModal(true);
  };

  const handleToggleAttendance = (eventId, memberId) => {
    setAttendanceByEvent((prev) => {
      const prevEvent = prev[eventId] || {};
      return {
        ...prev,
        [eventId]: {
          ...prevEvent,
          [memberId]: !prevEvent[memberId],
        },
      };
    });
  };

  const handleCloseAttendanceModal = () => {
    setShowAttendanceModal(false);
    setAttendanceEvent(null);
  };

  // NEW: RSVP button handler (placeholder behavior)
  const handleRSVPClick = () => {
    window.alert(
      "RSVPs are typically handled on the public event page. This admin dashboard button is a placeholder for viewing RSVP details."
    );
  };

  // announcements actions
  const handleAddAnnouncement = () => {
    const trimmed = newAnnouncement.trim();
    if (!trimmed) return;
    setAnnouncements((prev) => [
      {
        id: Date.now(),
        text: trimmed,
        createdAt: new Date().toISOString().slice(0, 10),
        status: "draft",
      },
      ...prev,
    ]);
    setNewAnnouncement("");
  };

  const handleToggleAnnouncementStatus = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: a.status === "published" ? "draft" : "published",
            }
          : a
      )
    );
  };

  const handleDeleteAnnouncement = (id) => {
    const ok = window.confirm("Delete this announcement?");
    if (!ok) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const initialTags = club?.tag
    ? club.tag
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  /* small helper styles for minimal buttons */
  const ghostButton = {
    borderRadius: 999,
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#111827",
  };

  const subtleTextButton = {
    border: "none",
    background: "transparent",
    padding: 0,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#4B5563",
  };

  const dangerTextButton = {
    ...subtleTextButton,
    color: "#B91C1C",
  };

  const pillButton = {
    borderRadius: 999,
    padding: "6px 12px",
    border: "none",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
  };

  const softOutlineButton = {
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: "1px solid #E5E7EB",
    background: "#F9FAFB",
    color: "#111827",
  };

  // NEW: filter events into upcoming vs old
  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = events.filter(
    (ev) => !ev.date || ev.date >= today
  );
  const pastEvents = events.filter((ev) => ev.date && ev.date < today);

  const eventsToRender = showOldEvents ? pastEvents : upcomingEvents;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F3F4F6",
        padding: "28px 36px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* ======= TOP BAR ======= */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Left: Club name + badge */}
        <div>
          <div
            style={{
              color: "#111827",
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {loading ? "Loading..." : club?.name || "Club"}
          </div>

          {!loading && club && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: isPending ? "#4B5563" : "#16A34A",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "999px",
                  backgroundColor: isPending ? "#9CA3AF" : "#22C55E",
                }}
              />
              {isPending ? "Pending approval" : "Approved club"}
            </div>
          )}
        </div>

        {/* Right: Members / Edit in a simple row, chunky pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            type="button"
            style={ghostButton}
            onClick={() => setShowMembersModal(true)}
          >
            Members
          </button>

          <button
            type="button"
            style={ghostButton}
            onClick={() => setShowEditModal(true)}
          >
            Edit club
          </button>
        </div>
      </header>

      {/* ======= MAIN CONTENT ======= */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginTop: 8,
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: 4,
            borderRadius: 999,
            background: "#E5E7EB80",
            marginBottom: 16,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("events")}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              background: activeTab === "events" ? "#111827" : "transparent",
              color: activeTab === "events" ? "#F9FAFB" : "#4B5563",
            }}
          >
            Events
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("announcements")}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              background:
                activeTab === "announcements" ? "#111827" : "transparent",
              color: activeTab === "announcements" ? "#F9FAFB" : "#4B5563",
            }}
          >
            Announcements
          </button>
        </div>

        {/* Tab content */}
        <section
          style={{
            flex: 1,
            fontSize: 14,
            color: "#4B5563",
          }}
        >
          {/* EVENTS TAB */}
          {activeTab === "events" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Header row for Events */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {showOldEvents ? "Old events" : "Upcoming events"}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      marginTop: 2,
                    }}
                  >
                    Manage what members can see on your events page.
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  {/* NEW: Old events toggle button */}
                  <button
                    type="button"
                    style={{
                      ...softOutlineButton,
                      background: showOldEvents ? "#111827" : "#F9FAFB",
                      color: showOldEvents ? "#F9FAFB" : "#111827",
                    }}
                    onClick={() => setShowOldEvents((prev) => !prev)}
                  >
                    {showOldEvents ? "Show upcoming" : "Old events"}
                  </button>

                  <button
                    type="button"
                    style={{
                      ...ghostButton,
                      border: "none",
                      background: "#111827",
                      color: "#F9FAFB",
                      padding: "8px 16px",
                      fontSize: 13,
                    }}
                    onClick={() => setShowCreateEventModal(true)}
                  >
                    Create event
                  </button>
                </div>
              </div>

              {/* Event list */}
              {(eventsToRender || []).length === 0 ? (
                <div
                  style={{
                    marginTop: 8,
                    padding: "24px 18px",
                    borderRadius: 16,
                    border: "1px dashed #D1D5DB",
                    background: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      marginBottom: 4,
                    }}
                  >
                    +
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#111827",
                    }}
                  >
                    {showOldEvents
                      ? "No old events yet"
                      : "No events yet"}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6B7280",
                      maxWidth: 320,
                    }}
                  >
                    {showOldEvents
                      ? "Past events will appear here once you start hosting."
                      : "Create your first event. Once you post it, members will be able to RSVP."}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {eventsToRender.map((ev) => {
                    const isPublished = ev.status === "published";

                    const dateStr = ev.date
                      ? new Date(ev.date + "T00:00:00").toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "";

                    const timeStr = ev.startTime
                      ? `${ev.startTime.slice(0, 5)}${
                          ev.endTime ? ` – ${ev.endTime.slice(0, 5)}` : ""
                        }`
                      : "";

                    const primaryLabel = isPublished ? "Edit" : "Post";

                    return (
                      <div
                        key={ev.id}
                        style={{
                          borderRadius: 18,
                          border: "1px solid #E5E7EB",
                          background: "#FFFFFF",
                          padding: 16,
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 12,
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#111827",
                                wordBreak: "break-word",
                              }}
                            >
                              {ev.title}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 10,
                                fontSize: 12,
                                color: "#6B7280",
                                marginTop: 6,
                              }}
                            >
                              {dateStr && (
                                <span
                                  style={{
                                    padding: "4px 8px",
                                    borderRadius: 999,
                                    background: "#F3F4F6",
                                  }}
                                >
                                  {dateStr}
                                </span>
                              )}
                              {timeStr && (
                                <span
                                  style={{
                                    padding: "4px 8px",
                                    borderRadius: 999,
                                    background: "#F3F4F6",
                                  }}
                                >
                                  {timeStr}
                                </span>
                              )}
                              {ev.location && (
                                <span
                                  style={{
                                    padding: "4px 8px",
                                    borderRadius: 999,
                                    background: "#F3F4F6",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxWidth: 220,
                                  }}
                                >
                                  {ev.location}
                                </span>
                              )}
                            </div>

                            {ev.description && (
                              <p
                                style={{
                                  margin: 8,
                                  marginLeft: 0,
                                  fontSize: 13,
                                  color: "#4B5563",
                                  maxHeight: 44,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {ev.description}
                              </p>
                            )}
                          </div>

                          {/* status pill */}
                          <span
                            style={{
                              fontSize: 11,
                              padding: "4px 10px",
                              borderRadius: 999,
                              background: isPublished
                                ? "#ECFDF3"
                                : "#F3F4F6",
                              color: isPublished ? "#15803D" : "#6B7280",
                              whiteSpace: "nowrap",
                              fontWeight: 500,
                            }}
                          >
                            {isPublished ? "Posted" : "Draft"}
                          </span>
                        </div>

                        {/* NEW: RSVP + Mark attendance + existing actions */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 10,
                            marginTop: 4,
                            flexWrap: "wrap",
                          }}
                        >
                          {/* NEW: RSVP button (before mark attendance) */}
                          <button
                            type="button"
                            style={{
                              ...pillButton,
                              background: "#EEF2FF",
                              color: "#3730A3",
                            }}
                            onClick={handleRSVPClick}
                          >
                            RSVP
                          </button>

                          {/* NEW: Mark attendance button (before Edit/Post) */}
                          <button
                            type="button"
                            style={{
                              ...pillButton,
                              background: "#ECFDF3",
                              color: "#166534",
                            }}
                            onClick={() => handleOpenAttendance(ev)}
                          >
                            Mark attendance
                          </button>

                          {/* Existing actions */}
                          <button
                            type="button"
                            style={subtleTextButton}
                            onClick={() => handleToggleEventStatus(ev.id)}
                          >
                            {primaryLabel}
                          </button>
                          <button
                            type="button"
                            style={dangerTextButton}
                            onClick={() => handleDeleteEvent(ev.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ANNOUNCEMENTS TAB */}
          {activeTab === "announcements" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* New announcement composer */}
              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #E5E7EB",
                  background: "#FFFFFF",
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <textarea
                  placeholder="Share an update with your members..."
                  rows={3}
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    padding: "10px 12px",
                    fontSize: 13,
                    resize: "vertical",
                    minHeight: 60,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      ...ghostButton,
                      border: "none",
                      background: "#111827",
                      color: "#F9FAFB",
                      padding: "8px 16px",
                      fontSize: 12,
                    }}
                    onClick={handleAddAnnouncement}
                  >
                    Add announcement
                  </button>
                </div>
              </div>

              {/* List of announcements */}
              {announcements.length === 0 ? (
                <div
                  style={{
                    padding: "18px 16px",
                    borderRadius: 18,
                    border: "1px dashed #D1D5DB",
                    background: "#FFFFFF",
                    fontSize: 13,
                    color: "#6B7280",
                  }}
                >
                  No announcements yet.
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {announcements.map((a) => {
                    const isPublished = a.status === "published";
                    const primaryLabel = isPublished ? "Edit" : "Post";
                    const dateStr = a.createdAt
                      ? new Date(a.createdAt + "T00:00:00").toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "";

                    return (
                      <div
                        key={a.id}
                        style={{
                          borderRadius: 16,
                          border: "1px solid #E5E7EB",
                          background: "#FFFFFF",
                          padding: 12,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: 8,
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                color: "#111827",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {a.text}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: 2,
                              minWidth: 80,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                color: "#6B7280",
                              }}
                            >
                              {dateStr}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                color: isPublished ? "#15803D" : "#6B7280",
                              }}
                            >
                              {isPublished ? "Posted" : "Draft"}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 12,
                          }}
                        >
                          <button
                            type="button"
                            style={subtleTextButton}
                            onClick={() =>
                              handleToggleAnnouncementStatus(a.id)
                            }
                          >
                            {primaryLabel}
                          </button>
                          <button
                            type="button"
                            style={dangerTextButton}
                            onClick={() => handleDeleteAnnouncement(a.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* ======= BOTTOM RIGHT BACK BUTTON ======= */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          style={{
            ...ghostButton,
            padding: "8px 16px",
            minWidth: "auto",
          }}
          onClick={handleGoBack}
        >
          Back
        </button>
      </div>

      {/* ======= VIEW MEMBERS MODAL ======= */}
      <PopUpModals
        open={showMembersModal}
        onClose={() => {
          setShowMembersModal(false);
          setConfirmKickId(null);
        }}
      >
        <div
          style={{
            width: "min(92vw, 500px)",
            maxHeight: "min(92vh, 600px)",
            background: "white",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
          }}
        >
          {/* Header strip */}
          <div
            style={{
              background: "#065F46",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 20px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "white",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Members
            </h2>
          </div>

          <div
            style={{
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {members.length === 0 ? (
              <p style={{ fontSize: 13, color: "#4B5563" }}>
                No members in this club yet.
              </p>
            ) : (
              members.map((member) => {
                const isConfirming = confirmKickId === member.id;
                return (
                  <div
                    key={member.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "#111827",
                        wordBreak: "break-all",
                      }}
                    >
                      {member.email}
                    </span>

                    {!isConfirming ? (
                      <button
                        type="button"
                        onClick={() => handleKickClick(member.id)}
                        style={{
                          ...dangerTextButton,
                          borderRadius: 999,
                          border: "1px solid #FCA5A5",
                          background: "#FEF2F2",
                          padding: "4px 10px",
                          fontSize: 12,
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                        }}
                      >
                        <button
                          type="button"
                          onClick={handleCancelKick}
                          style={{
                            ...subtleTextButton,
                            borderRadius: 999,
                            border: "1px solid #D1D5DB",
                            background: "#FFFFFF",
                            padding: "4px 10px",
                            fontSize: 12,
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmKick(member.id)}
                          style={{
                            ...dangerTextButton,
                            borderRadius: 999,
                            border: "1px solid #B91C1C",
                            background: "#B91C1C",
                            color: "#FFFFFF",
                            padding: "4px 10px",
                            fontSize: 12,
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </PopUpModals>

      {/* ======= EDIT CLUB MODAL ======= */}
      <PopUpModals
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {club && (
          <CreateClubPopUp
            title="Edit Club"
            confirmText="Save changes"
            cancelText="Cancel"
            onCancel={() => setShowEditModal(false)}
            onCreate={handleEditSave}
            initialName={club.name || ""}
            initialDescription={club.description || ""}
            initialTags={initialTags}
            initialImageUrl={club.imageUrl || ""}
          />
        )}
      </PopUpModals>

      {/* ======= CREATE EVENT MODAL ======= */}
      <PopUpModals
        open={showCreateEventModal}
        onClose={() => setShowCreateEventModal(false)}
      >
        <CreateEventModal
          onSave={handleCreateEventSave}
          onCancel={() => setShowCreateEventModal(false)}
        />
      </PopUpModals>

      {/* ======= MARK ATTENDANCE MODAL (NEW) ======= */}
      <PopUpModals open={showAttendanceModal} onClose={handleCloseAttendanceModal}>
        <div
          style={{
            width: "min(92vw, 520px)",
            maxHeight: "min(92vh, 620px)",
            background: "#FFFFFF",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
          }}
        >
          <div
            style={{
              background: "#065F46",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "white",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              Mark attendance
            </h2>
            <button
              type="button"
              onClick={handleCloseAttendanceModal}
              style={{
                border: "none",
                background: "rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "4px 10px",
                color: "#E5E7EB",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>

          <div
            style={{
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {attendanceEvent && (
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 13,
                  color: "#4B5563",
                }}
              >
                Event:{" "}
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {attendanceEvent.title}
                </span>
              </div>
            )}

            {members.length === 0 ? (
              <p style={{ fontSize: 13, color: "#4B5563" }}>
                No members to mark attendance for.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  maxHeight: 360,
                  overflowY: "auto",
                }}
              >
                {members.map((member) => {
                  const eventId = attendanceEvent?.id;
                  const eventAttendance = attendanceByEvent[eventId] || {};
                  const isPresent = !!eventAttendance[member.id];

                  return (
                    <label
                      key={member.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: "1px solid #E5E7EB",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: "#111827",
                          wordBreak: "break-all",
                        }}
                      >
                        {member.email}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: isPresent ? "#15803D" : "#6B7280",
                          }}
                        >
                          {isPresent ? "Present" : "Absent"}
                        </span>
                        <input
                          type="checkbox"
                          checked={isPresent}
                          onChange={() =>
                            handleToggleAttendance(eventId, member.id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            <div
              style={{
                marginTop: 10,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={handleCloseAttendanceModal}
                style={{
                  ...ghostButton,
                  border: "none",
                  background: "#111827",
                  color: "#F9FAFB",
                  padding: "8px 16px",
                  fontSize: 13,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </PopUpModals>
    </div>
  );
}
