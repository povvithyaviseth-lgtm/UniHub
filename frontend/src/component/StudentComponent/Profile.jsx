import React, { useEffect, useState } from "react";
import closeImg from "../../images/Close.png";
import { useStudentStore } from "../../store/student";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5050";

export default function Profile({
  onClose = () => {},
  onEditProfile = () => {},
  onManageClub = () => {},
}) {
  const { student, isAuthenticated, token } = useStudentStore();
  const logout = useStudentStore((s) => s.logout);
  const navigate = useNavigate();

  const [joinedClubs, setJoinedClubs] = useState([]);
  const [leaveModeClubId, setLeaveModeClubId] = useState(null); // which club is in “get outta here” mode

  // fetch real clubs the user joined
  useEffect(() => {
    const loadJoinedClubs = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/api/clubs/joined`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setJoinedClubs(data.clubs || []);
        }
      } catch (err) {
        console.error("Error loading joined clubs:", err);
      }
    };

    loadJoinedClubs();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle leave request
  const handleLeaveClub = async (clubId) => {
    try {
      const res = await fetch(`${API_BASE}/api/clubs/${clubId}/leave`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        // remove from UI list
        setJoinedClubs((prev) => prev.filter((c) => c._id !== clubId));
        setLeaveModeClubId(null);
      } else {
        alert(data.message || "Failed to leave club");
      }
    } catch (err) {
      console.error("Error leaving club:", err);
      alert("Network error");
    }
  };

  // Name + Email fallback
  const email = student?.email || "";
  const role = student?.role || "";
  const userName =
    student?.name || (email ? email.split("@")[0] : "Unknown User");

  const initials = React.useMemo(() => {
    const source = userName || email || "";
    const parts = source
      .replace(/@.*/, "")
      .split(/[.\s_-]+/)
      .filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [userName, email]);

  const isClubOwner = role === "club owner";

  // 🔹 nice, short label instead of long role text
  const roleLabel =
    role === "club owner"
      ? "Club Owner"
      : role === "admin"
      ? "Admin"
      : role || "";

  return (
    <div
      style={{
        width: 600,
        maxWidth: "100%",
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
        padding: 24,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: "#00550A",
          }}
        >
          My Profile
        </h2>

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            width: 40,
            height: 40,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            src={closeImg}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(0.7) contrast(1.1)",
            }}
          />
        </button>
      </div>

      {/* Identity */}
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Avatar */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                background: "#E5F2FF",
                border: "2px solid #00550A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "#00550A",
              }}
            >
              {initials}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {userName}
              </div>
              <div style={{ fontSize: 14, color: "#6B7280" }}>{email}</div>

              {roleLabel && (
                <span
                  style={{
                    marginTop: 4,
                    alignSelf: "flex-start",
                    padding: "2px 6px",
                    borderRadius: 999,
                    border: "1px solid #E5E7EB",
                    fontSize: 10,
                    background: "#F3F4F6",
                    color: "#4B5563",
                    lineHeight: 1.3,
                  }}
                >
                  {roleLabel}
                </span>
              )}
            </div>
          </div>

          {/* Manage button */}
          {isClubOwner && (
            <button
              className="btn-primary"
              onClick={onManageClub}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "none",
                background: "#00550A",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Manage Your Club
            </button>
          )}
        </div>

        {/* Settings */}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 14, color: "#6B7280" }}>
            Account Settings
          </span>
          <button
            className="btn-link"
            onClick={onEditProfile}
            style={{
              background: "none",
              border: "none",
              color: "#009C6A",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* My Clubs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          My Clubs
        </h3>

        <div
          style={{
            borderRadius: 12,
            border: "1px solid #E5E7EB",
            background: "#F9FAFB",
            maxHeight: 200,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {joinedClubs.length === 0 && (
            <div style={{ color: "#6B7280", fontSize: 14 }}>
              You have not joined any clubs yet.
            </div>
          )}

          {joinedClubs.map((club) => {
            const isLeaving = leaveModeClubId === club._id;

            return (
              <div
                key={club._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 4px",
                }}
              >
                <span style={{ fontSize: 15, color: "#111827" }}>
                  {club.name}
                </span>

                {!isLeaving ? (
                  <button
                    onClick={() => setLeaveModeClubId(club._id)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 999,
                      border: "1px solid #FCA5A5",
                      background: "#FEF2F2",
                      color: "#DC2626",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Leave
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => handleLeaveClub(club._id)}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px solid #DC2626",
                        background: "#FEE2E2",
                        color: "#B91C1C",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      Get outta here
                    </button>

                    <button
                      onClick={() => setLeaveModeClubId(null)}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px solid #D1D5DB",
                        background: "#FFFFFF",
                        color: "#374151",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sign Out */}
      <div>
        <button
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 999,
            border: "1px solid #EF4444",
            background: "transparent",
            color: "#EF4444",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
