import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
// You can later swap these placeholders with real components/forms
// import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";

const API_BASE_URL = "http://localhost:5050";

export default function ClubDashboard() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [club, setClub] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [activeTab, setActiveTab] = React.useState("events"); // "events" | "announcements"
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  // Very simple fetch skeleton — wire up backend later
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
    navigate("/console/clubs"); // or wherever your ClubManagement lives
  };

  const isPending = club?.status === "pending";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F6F6F6",
        display: "flex",
        justifyContent: "center",
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        {/* ======= HEADER: club name (left) + status (right) ======= */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <button
              type="button"
              onClick={handleGoBack}
              style={{
                marginBottom: 8,
                fontSize: 14,
                color: "#6B7280",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              ← Back
            </button>

            <div
              style={{
                color: "black",
                fontSize: 32,
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              {loading ? "Loading..." : club?.name || "Club"}
            </div>
          </div>

          {/* Status pill on the right */}
          {!loading && club && (
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: isPending ? "#F3F4F6" : "#DCFCE7",
                color: isPending ? "#4B5563" : "#166534",
                textTransform: "uppercase",
                letterSpacing: 0.6,
                whiteSpace: "nowrap",
              }}
            >
              {isPending ? "Pending approval" : "Approved"}
            </div>
          )}
        </header>

        {/* ======= ACTION BUTTONS: View Members + Edit ======= */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <button
            type="button"
            className="btn-primary"
            style={{
              minWidth: 150,
              height: 40,
              fontSize: 16,
              borderRadius: 999,
            }}
            onClick={() => setShowMembersModal(true)}
          >
            View Members
          </button>

          <button
            type="button"
            className="btn-primary"
            style={{
              minWidth: 150,
              height: 40,
              fontSize: 16,
              borderRadius: 999,
              background: "#FFFFFF",
              color: "#111827",
              border: "1px solid #D1D5DB",
            }}
            onClick={() => setShowEditModal(true)}
          >
            Edit Club
          </button>
        </div>

        {/* ======= TABS: Events / Announcements ======= */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #E5E7EB",
            marginBottom: 16,
            gap: 8,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("events")}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              background:
                activeTab === "events" ? "#111827" : "transparent",
              color: activeTab === "events" ? "#FFFFFF" : "#6B7280",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Events
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("announcements")}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              background:
                activeTab === "announcements" ? "#111827" : "transparent",
              color:
                activeTab === "announcements" ? "#FFFFFF" : "#6B7280",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Announcements
          </button>
        </div>

        {/* ======= TAB CONTENT AREA ======= */}
        <section
          style={{
            minHeight: 200,
            padding: 8,
          }}
        >
          {activeTab === "events" && (
            <div
              style={{
                fontSize: 16,
                color: "#4B5563",
              }}
            >
              {/* Skeleton UI for Events */}
              <p>Events list will go here.</p>
              <ul style={{ paddingLeft: 18 }}>
                <li>Show upcoming events</li>
                <li>Button to create a new event</li>
                <li>Per event: view RSVPs, edit, mark attendance</li>
              </ul>
            </div>
          )}

          {activeTab === "announcements" && (
            <div
              style={{
                fontSize: 16,
                color: "#4B5563",
              }}
            >
              {/* Skeleton UI for Announcements */}
              <p>Announcements will go here.</p>
              <ul style={{ paddingLeft: 18 }}>
                <li>Simple text area to post new announcement</li>
                <li>List of past announcements</li>
              </ul>
            </div>
          )}
        </section>
      </div>

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
          {/* Later you can replace this with your CreateClubPopUp or a dedicated EditClub form */}
        </div>
      </PopUpModals>
    </div>
  );
}
