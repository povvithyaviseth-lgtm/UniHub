import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";

const API_BASE_URL = "http://localhost:5050";

export default function ClubDashboard() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [club, setClub] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [activeTab, setActiveTab] = React.useState("events"); // "events" | "announcements"
  const [showMembersModal, setShowMembersModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  // minimal mock members list
  const [members, setMembers] = React.useState([
    { id: 1, email: "student1@example.edu" },
    { id: 2, email: "student2@example.edu" },
    { id: 3, email: "student3@example.edu" },
  ]);

  const [confirmKickId, setConfirmKickId] = React.useState(null);

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
    // payload contains { name, tag, imageUrl, imageFile, description, draft }
    // Here we just update local state; later you can call your backend.
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
    // Later: hit backend to remove member
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    setConfirmKickId(null);
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
        {/* Left: Club name + badge (no back here anymore) */}
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
              <span
                style={{
                  fontSize: 12,
                }}
              >
              </span>
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


      {/* ======= VIEW MEMBERS MODAL (minimal style + kick confirm) ======= */}
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
          {/* Header strip similar in feel to CreateClubPopUp */}
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

      {/* ======= EDIT CLUB MODAL (uses CreateClubPopUp in edit mode) ======= */}
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
    </div>
  );
}
