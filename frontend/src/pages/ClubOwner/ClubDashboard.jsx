// src/pages/ClubOwner/ClubDashboard.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";
import EventRowCard from "../../component/ClubOwnerComponent/EventRowCard.jsx";
import AnnouncementItem from "../../component/ClubOwnerComponent/AnnouncementItem.jsx";
import MembersModalContent from "../../component/ClubOwnerComponent/MembersModalContent.jsx";
import AttendanceModalContent from "../../component/ClubOwnerComponent/AttendanceModalContent.jsx";
import CreateEventModal from "../../component/ClubOwnerComponent/CreateEventModal.jsx";
import "../../index.css";

const API_BASE_URL = "http://localhost:5050";

/* ======= MAIN DASHBOARD ======= */
export default function ClubDashboard() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [club, setClub] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState("");

  const [activeTab, setActiveTab] = React.useState("events"); // "events" | "announcements"
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showCreateEventModal, setShowCreateEventModal] =
    React.useState(false);

  // Attendance modal state
  const [showAttendanceModal, setShowAttendanceModal] = React.useState(false);
  const [attendanceEvent, setAttendanceEvent] = React.useState(null);

  const [members, setMembers] = React.useState([
    { id: 1, email: "student1@example.edu" },
    { id: 2, email: "student2@example.edu" },
    { id: 3, email: "student3@example.edu" },
  ]);
  const [confirmKickId, setConfirmKickId] = React.useState(null);

  // 🔹 Events now come from backend
  const [events, setEvents] = React.useState([]);
  const [eventsError, setEventsError] = React.useState("");
  const [eventsLoading, setEventsLoading] = React.useState(false);

  // eventId -> { [memberId]: boolean }
  const [attendanceByEvent, setAttendanceByEvent] = React.useState({});

  // simple announcements (still local-only)
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

  const [showOldEvents, setShowOldEvents] = React.useState(false);

  // 🔗 Fetch this specific club by ID
  React.useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setLoadError("You must be logged in to view this club.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/clubs/${clubId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch club");
        }

        // Depending on your backend shape, this might be `data.club` or `data`
        setClub(data.club || data);
      } catch (err) {
        console.error(err);
        setLoadError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (clubId) {
      fetchClub();
    }
  }, [clubId]);

  // 🔗 Fetch events for this club
  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!clubId) return;
        setEventsLoading(true);
        setEventsError("");

        const res = await fetch(`${API_BASE_URL}/api/events/club/${clubId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch events");
        }

        const eventsFromApi = data.events || [];

        // Normalize backend `_id` to `id` so EventRowCard & local logic still work
        const normalized = eventsFromApi.map((ev) => ({
          ...ev,
          id: ev._id || ev.id,
        }));

        setEvents(normalized);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEventsError(err.message);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
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

  // 🔹 Create event → call backend
  const handleCreateEventSave = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.alert("You must be logged in to create an event.");
        return;
      }

      const { title, date, startTime, location, description, imageFile } =
        payload;

      const formData = new FormData();
      if (title) formData.append("title", title);
      if (date) formData.append("date", date);
      if (startTime) formData.append("startTime", startTime);
      if (location) formData.append("location", location);
      if (description) formData.append("description", description);
      if (imageFile) formData.append("image", imageFile); // field name must match multer.single("image")

      const res = await fetch(`${API_BASE_URL}/api/events/${clubId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❗ do NOT set Content-Type here; browser will set multipart boundary
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      const saved = data.event;

      const normalized = {
        ...saved,
        id: saved._id || saved.id,
      };

      setEvents((prev) => [...prev, normalized]);
      setShowCreateEventModal(false);
    } catch (err) {
      console.error("Error creating event:", err);
      window.alert(err.message || "Failed to create event");
    }
  };

  // draft <-> published toggle (local-only for now)
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

  // delete event (currently local-only; can be wired to backend later)
  const handleDeleteEvent = (eventId) => {
    const ok = window.confirm("Delete this event? This cannot be undone.");
    if (!ok) return;
    setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
  };

  // attendance handlers
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

  // RSVP placeholder
  const handleRSVPClick = () => {
    window.alert(
      "RSVPs are typically handled on the public event page. This admin dashboard button is a placeholder for viewing RSVP details."
    );
  };

  // announcement actions
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

  // helper styles
  const ghostButton = {
    borderRadius: 999,
    border: "1px solid #A7F3D0",
    background: "#ECFDF3",
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#065F46",
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

  // upcoming vs old
  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = events.filter((ev) => !ev.date || ev.date >= today);
  const pastEvents = events.filter((ev) => ev.date && ev.date < today);
  const eventsToRender = showOldEvents ? pastEvents : upcomingEvents;

  return (
    <div
      className="club-dashboard-root"
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#F8FAFC",
        padding: "24px 12px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Main card shell to match home style */}
      <div
        className="club-dashboard-shell"
        style={{
          width: "100%",
          maxWidth: 1240,
          background: "#FFFFFF",
          borderRadius: 20,
          boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
          padding: "20px 24px 24px 24px",
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
            paddingBottom: 8,
            borderBottom: "1px solid #E5E7EB",
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
              {loading
                ? "Loading..."
                : loadError
                ? "Error loading club"
                : club?.name || "Club"}
            </div>

            {!loading && loadError && (
              <div
                style={{
                  fontSize: 12,
                  color: "#B91C1C",
                  maxWidth: 420,
                }}
              >
                {loadError}
              </div>
            )}

            {!loading && club && !loadError && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  border: isPending
                    ? "1px solid #E5E7EB"
                    : "1px solid #BBF7D0",
                  backgroundColor: isPending ? "#F9FAFB" : "#ECFDF3",
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

          {/* Right: Members / Edit */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <button
              type="button"
              className="cd-ghost-btn"
              style={ghostButton}
              onClick={() => setShowMembersModal(true)}
            >
              Members
            </button>

            <button
              type="button"
              className="cd-ghost-btn"
              style={ghostButton}
              onClick={() => setShowEditModal(true)}
              disabled={!!loadError}
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
              background: "#DCFCE7",
              marginBottom: 16,
              alignSelf: "flex-start",
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
                background:
                  activeTab === "events" ? "#00550A" : "transparent",
                color: activeTab === "events" ? "#F9FAFB" : "#166534",
                transition: "background-color 160ms ease, color 160ms ease",
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
                  activeTab === "announcements" ? "#00550A" : "transparent",
                color:
                  activeTab === "announcements" ? "#F9FAFB" : "#166534",
                transition: "background-color 160ms ease, color 160ms ease",
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
                    {/* Old events toggle button */}
                    <button
                      type="button"
                      style={{
                        ...softOutlineButton,
                        background: showOldEvents ? "#00550A" : "#F9FAFB",
                        color: showOldEvents ? "#F9FAFB" : "#111827",
                        transition:
                          "background-color 160ms ease, color 160ms ease, border-color 160ms ease",
                      }}
                      onClick={() => setShowOldEvents((prev) => !prev)}
                    >
                      {showOldEvents ? "Show upcoming" : "Old events"}
                    </button>

                    <button
                      type="button"
                      className="cd-ghost-btn"
                      style={{
                        ...ghostButton,
                        border: "none",
                        background: "#00550A",
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
                {eventsLoading ? (
                  <div
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      paddingTop: 8,
                    }}
                  >
                    Loading events...
                  </div>
                ) : eventsError ? (
                  <div
                    style={{
                      fontSize: 13,
                      color: "#B91C1C",
                      paddingTop: 8,
                    }}
                  >
                    {eventsError}
                  </div>
                ) : (eventsToRender || []).length === 0 ? (
                  <div
                    style={{
                      marginTop: 8,
                      padding: "24px 18px",
                      borderRadius: 16,
                      border: "1px dashed #BBF7D0",
                      background: "#F0FDF4",
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
                        border: "1px solid #BBF7D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        marginBottom: 4,
                        color: "#065F46",
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
                    {eventsToRender.map((ev, index) => (
                      <div
                        key={ev.id || ev._id}
                        className="cd-list-item-anim"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <EventRowCard
                          event={ev}
                          onRSVP={handleRSVPClick}
                          onOpenAttendance={handleOpenAttendance}
                          onToggleStatus={handleToggleEventStatus}
                          onDelete={handleDeleteEvent}
                        />
                      </div>
                    ))}
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
                    background: "#F9FAFB",
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
                      background: "#FFFFFF",
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
                      className="cd-ghost-btn"
                      style={{
                        ...ghostButton,
                        border: "none",
                        background: "#00550A",
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
                    {announcements.map((a, index) => (
                      <div
                        key={a.id}
                        className="cd-list-item-anim"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <AnnouncementItem
                          announcement={a}
                          onToggleStatus={handleToggleAnnouncementStatus}
                          onDelete={handleDeleteAnnouncement}
                        />
                      </div>
                    ))}
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
            className="cd-ghost-btn"
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
      </div>

      {/* ======= VIEW MEMBERS MODAL (now animated) ======= */}
      <PopUpModals
        open={showMembersModal}
        onClose={() => {
          setShowMembersModal(false);
          setConfirmKickId(null);
        }}
      >
        <div className="cd-modal-shell">
          <MembersModalContent
            members={members}
            confirmKickId={confirmKickId}
            onKickClick={handleKickClick}
            onCancelKick={handleCancelKick}
            onConfirmKick={handleConfirmKick}
            onClose={() => {
              setShowMembersModal(false);
              setConfirmKickId(null);
            }}
          />
        </div>
      </PopUpModals>

      {/* ======= EDIT CLUB MODAL ======= */}
      <PopUpModals
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        {club && !loadError && (
          <div className="cd-modal-shell">
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
          </div>
        )}
      </PopUpModals>

      {/* ======= CREATE EVENT MODAL ======= */}
      <PopUpModals
        open={showCreateEventModal}
        onClose={() => setShowCreateEventModal(false)}
      >
        <div className="cd-modal-shell">
          <CreateEventModal
            onSave={handleCreateEventSave}
            onCancel={() => setShowCreateEventModal(false)}
          />
        </div>
      </PopUpModals>

      {/* ======= MARK ATTENDANCE MODAL ======= */}
      <PopUpModals
        open={showAttendanceModal}
        onClose={handleCloseAttendanceModal}
      >
        <div className="cd-modal-shell">
          <AttendanceModalContent
            event={attendanceEvent}
            members={members}
            attendanceByEvent={attendanceByEvent}
            onToggleAttendance={handleToggleAttendance}
            onClose={handleCloseAttendanceModal}
          />
        </div>
      </PopUpModals>
    </div>
  );
}
