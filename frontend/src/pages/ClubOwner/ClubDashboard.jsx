import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";

const API_BASE_URL = "http://localhost:5050";

/* ======= CREATE EVENT MODAL ======= */
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
        background: "white",
        borderRadius: 15,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0,0,0,.25)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#00550A",
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          Create Event
        </h2>
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
          <label style={{ fontWeight: 600 }}>Event name *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Weekly Study Session"
            style={{
              borderRadius: 10,
              border: errors.title ? "1px solid #DC2626" : "1px solid #D1D5DB",
              padding: "8px 10px",
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
            <label style={{ fontWeight: 600 }}>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                borderRadius: 10,
                border: errors.date
                  ? "1px solid #DC2626"
                  : "1px solid #D1D5DB",
                padding: "8px 10px",
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
            <label style={{ fontWeight: 600 }}>Start *</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                borderRadius: 10,
                border: errors.startTime
                  ? "1px solid #DC2626"
                  : "1px solid #D1D5DB",
                padding: "8px 10px",
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
            <label style={{ fontWeight: 600 }}>End</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                borderRadius: 10,
                border: "1px solid #D1D5DB",
                padding: "8px 10px",
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
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontWeight: 600 }}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Room 204, Science Building"
                style={{
                  borderRadius: 10,
                  border: "1px solid #D1D5DB",
                  padding: "8px 10px",
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
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
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
              <label style={{ fontWeight: 600 }}>Join link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="e.g. Zoom / Google Meet link"
                style={{
                  borderRadius: 10,
                  border: "1px solid #D1D5DB",
                  padding: "8px 10px",
                  fontSize: 14,
                }}
              />
            </div>
          )}
        </div>

        {/* Capacity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 600 }}>
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
            placeholder="e.g. 30"
            style={{
              borderRadius: 10,
              border: "1px solid #D1D5DB",
              padding: "8px 10px",
              fontSize: 14,
              maxWidth: 160,
            }}
          />
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 600 }}>
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
              borderRadius: 10,
              border: "1px solid #D1D5DB",
              padding: "8px 10px",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          padding: 16,
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          background: "#F9FAFB",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            borderRadius: 10,
            border: "1px solid #D1D5DB",
            background: "#FFFFFF",
            padding: "8px 14px",
            fontSize: 14,
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
            borderRadius: 10,
            border: "none",
            background: "#00550A",
            padding: "8px 18px",
            fontSize: 14,
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

  // minimal mock members list
  const [members, setMembers] = React.useState([
    { id: 1, email: "student1@example.edu" },
    { id: 2, email: "student2@example.edu" },
    { id: 3, email: "student3@example.edu" },
  ]);

  const [confirmKickId, setConfirmKickId] = React.useState(null);

  // mock events for UI
  const [events, setEvents] = React.useState([
    {
      id: 1,
      title: "Welcome Mixer",
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
      title: "Weekly Study Session",
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

  React.useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        // TODO: replace with real backend
        // const res = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`);
        // const data = await res.json();
        // setClub(data.club);

        // TEMP MOCK so UI doesn't explode before backend exists
        setClub({
          _id: clubId,
          name: "Sample Club Name",
          status: "approved", // or "pending"
          description: "This is a sample description for the club.",
          tag: "Academic, Social",
          imageUrl: "", // if you have one later
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
    console.log("Edited club payload:", payload);
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

  const initialTags = club?.tag
    ? club.tag
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F9FAFB",
        padding: "24px 32px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ======= TOP BAR ======= */}
      <header
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Left: Club name + badge */}
        <div>
          <div
            style={{
              color: "#111827",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1.2,
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
                gap: 6,
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              <span style={{ color: isPending ? "#4B5563" : "#16A34A" }}>
                {isPending ? "Pending approval" : "Approved club"}
              </span>
            </div>
          )}
        </div>

        {/* Right: Members / Edit stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button
            type="button"
            className="btn-primary"
            style={{
              width: "100%",
              minWidth: 220,
              height: 41,
              fontSize: 17,
            }}
            onClick={() => setShowMembersModal(true)}
          >
            Members
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{
              width: "100%",
              minWidth: 220,
              height: 41,
              fontSize: 17,
            }}
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
        </div>
      </header>

      {/* ======= MAIN CONTENT ======= */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 24,
            borderBottom: "1px solid #E5E7EB",
            marginBottom: 16,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("events")}
            style={{
              padding: "8px 0",
              border: "none",
              background: "transparent",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              borderBottom:
                activeTab === "events"
                  ? "2px solid #111827"
                  : "2px solid transparent",
              color: activeTab === "events" ? "#111827" : "#9CA3AF",
            }}
          >
            Events
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("announcements")}
            style={{
              padding: "8px 0",
              border: "none",
              background: "transparent",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              borderBottom:
                activeTab === "announcements"
                  ? "2px solid #111827"
                  : "2px solid transparent",
              color: activeTab === "announcements" ? "#111827" : "#9CA3AF",
            }}
          >
            Announcements
          </button>
        </div>

        {/* Tab content */}
        <section
          style={{
            flex: 1,
            paddingTop: 4,
            fontSize: 15,
            color: "#4B5563",
          }}
        >
          {activeTab === "events" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Header row for Events */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
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
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      marginTop: 2,
                    }}
                  >
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    minWidth: 160,
                    height: 38,
                    fontSize: 14,
                  }}
                  onClick={() => setShowCreateEventModal(true)}
                >
                  Create event
                </button>
              </div>

              {/* Event list */}
              {events.length === 0 ? (
                <div
                  style={{
                    marginTop: 12,
                    padding: "24px 16px",
                    borderRadius: 14,
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
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    No events yet
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      maxWidth: 320,
                    }}
                  >
                    Start by creating your first event. Members will be able to
                    see and RSVP once you publish it.
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginTop: 4,
                  }}
                >
                  {events.map((ev) => {
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

                    return (
                      <div
                        key={ev.id}
                        style={{
                          borderRadius: 14,
                          border: "1px solid #E5E7EB",
                          background: "#FFFFFF",
                          padding: 16,
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: 12,
                        }}
                      >
                        {/* Left section */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 8,
                              marginBottom: 4,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: "#111827",
                                wordBreak: "break-word",
                              }}
                            >
                              {ev.title}
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              fontSize: 13,
                              color: "#6B7280",
                              marginBottom: 6,
                            }}
                          >
                            {dateStr && (
                              <span>
                                <span style={{ fontWeight: 500 }}>Date:</span>{" "}
                                {dateStr}
                              </span>
                            )}
                            {timeStr && (
                              <span>
                                <span style={{ fontWeight: 500 }}>Time:</span>{" "}
                                {timeStr}
                              </span>
                            )}
                            {ev.location && (
                              <span>
                                <span style={{ fontWeight: 500 }}>
                                  Location:
                                </span>{" "}
                                {ev.location}
                              </span>
                            )}
                            {ev.isOnline && ev.link && (
                              <span
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: 260,
                                }}
                              >
                                <span style={{ fontWeight: 500 }}>Link:</span>{" "}
                                {ev.link}
                              </span>
                            )}
                            {ev.capacity && (
                              <span>
                                <span style={{ fontWeight: 500 }}>
                                  Capacity:
                                </span>{" "}
                                {ev.capacity}
                              </span>
                            )}
                          </div>

                          {ev.description && (
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                color: "#4B5563",
                                maxHeight: 42,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {ev.description}
                            </p>
                          )}
                        </div>

                        {/* Right section: status + actions */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 8,
                            marginLeft: 12,
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 9px",
                              borderRadius: 999,
                              fontSize: 11,
                              fontWeight: 600,
                              border: "1px solid",
                              borderColor: isPublished
                                ? "#BBF7D0"
                                : "#E5E7EB",
                              backgroundColor: isPublished
                                ? "#ECFDF3"
                                : "#F9FAFB",
                              color: isPublished ? "#15803D" : "#4B5563",
                              textTransform: "uppercase",
                              letterSpacing: 0.6,
                            }}
                          >
                            {isPublished ? "Published" : "Draft"}
                          </span>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 6,
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleEventStatus(ev.id)}
                              style={{
                                borderRadius: 999,
                                border: "1px solid #D1D5DB",
                                background: "#FFFFFF",
                                padding: "5px 10px",
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: "pointer",
                                color: "#374151",
                              }}
                            >
                              {isPublished ? "Unpublish" : "Publish"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteEvent(ev.id)}
                              style={{
                                borderRadius: 999,
                                border: "1px solid #FCA5A5",
                                background: "#FEF2F2",
                                padding: "5px 10px",
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: "pointer",
                                color: "#B91C1C",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "announcements" && (
            <div>
              <p style={{ marginBottom: 8 }}>Announcements will go here.</p>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>Simple text area to post new announcement</li>
                <li>List of past announcements</li>
              </ul>
            </div>
          )}
        </section>
      </main>

      {/* ======= BOTTOM RIGHT BACK BUTTON ======= */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          className="btn-primary"
          style={{
            minWidth: 220,
            height: 41,
            fontSize: 17,
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
            borderRadius: 15,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 25px 60px rgba(0,0,0,.25)",
          }}
        >
          {/* Header strip */}
          <div
            style={{
              background: "#00550A",
              minHeight: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "white",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              Members
            </h2>
          </div>

          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {members.length === 0 ? (
              <p style={{ fontSize: 14, color: "#4B5563" }}>
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
                        fontSize: 14,
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
                          borderRadius: 8,
                          border: "1px solid #F97373",
                          background: "#FEF2F2",
                          color: "#B91C1C",
                          fontSize: 13,
                          fontWeight: 600,
                          padding: "6px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Kick
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
                            borderRadius: 8,
                            border: "1px solid #D1D5DB",
                            background: "#FFFFFF",
                            color: "#374151",
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "6px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmKick(member.id)}
                          style={{
                            borderRadius: 8,
                            border: "1px solid #B91C1C",
                            background: "#B91C1C",
                            color: "#FFFFFF",
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "6px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Kick them out!
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
            confirmText="Save Changes"
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
    </div>
  );
}
