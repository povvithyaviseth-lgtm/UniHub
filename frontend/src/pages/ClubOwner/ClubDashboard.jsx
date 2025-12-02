import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";

const API_BASE_URL = "http://localhost:5050";

export default function ClubDashboard() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [club, setClub] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [activeTab, setActiveTab] = React.useState("events"); // "events" | "announcements"
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

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
        {/* Left: Back, Club name, Badge */}
        <div>
          <button
            type="button"
            onClick={handleGoBack}
            style={{
              marginBottom: 8,
              fontSize: 13,
              color: "#6B7280",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
            }}
          >
            ← Back to clubs
          </button>

          <div
            style={{
              color: "#111827",
              fontSize: 28,
              fontWeight: 800,
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
              <span
                style={{
                  fontSize: 12,
                }}
              >
              </span>
              <span style={{ color: isPending ? "#4B5563" : "#16A34A" }}>
                {isPending ? "Pending approval" : "Approved"}
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
              minWidth: 190,
              height: 56,
              fontSize: 24,
              borderRadius: 999,
            }}
            onClick={() => setShowMembersModal(true)}
          >
            Members
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{
              minWidth: 190,
              height: 56,
              fontSize: 24,
              borderRadius: 999,
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
            <div>
              <p style={{ marginBottom: 8 }}>Events list will go here.</p>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>Show upcoming events</li>
                <li>Button to create a new event</li>
                <li>Per event: view RSVPs, edit, mark attendance</li>
              </ul>
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

      {/* ======= VIEW MEMBERS MODAL ======= */}
      <PopUpModals
        open={showMembersModal}
        onClose={() => setShowMembersModal(false)}
      >
        <div
          style={{
            padding: 20,
            minWidth: 320,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Members
          </h2>
          <p style={{ fontSize: 15, color: "#4B5563" }}>
            Members list will go here (name, email, role, remove button, etc.).
          </p>
        </div>
      </PopUpModals>

      {/* ======= EDIT CLUB MODAL ======= */}
      <PopUpModals
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <div
          style={{
            padding: 20,
            minWidth: 320,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Edit Club
          </h2>
          <p style={{ fontSize: 15, color: "#4B5563" }}>
            A simple form to edit club name, description, tags, etc. will go
            here.
          </p>
        </div>
      </PopUpModals>
    </div>
  );
}
