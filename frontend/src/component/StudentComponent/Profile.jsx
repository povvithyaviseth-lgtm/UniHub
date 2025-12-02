// src/components/Profile.jsx (or src/pages/Profile.jsx)
import React from "react";
import closeImg from "../../images/Close.png";
import { useStudentStore } from "../../store/student"; 
import { useNavigate } from "react-router-dom";

export default function Profile({
  onClose = () => {},
  onEditProfile = () => {},
  onLeaveClub = () => {},
  onManageClub = () => {},
}) {
  const { student, isAuthenticated } = useStudentStore();
  const logout = useStudentStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // clear store + localStorage
    navigate("/");  // redirect to login page
  };

  // Fallback if somehow not hydrated / not logged in
  const email = student?.email || "";
  const role = student?.role || "";
  const userName =
    student?.name ||
    (email ? email.split("@")[0] : "Unknown User");

  const initials = React.useMemo(() => {
    const source = userName || email || "";
    if (!source) return "";
    const parts = source
      .replace(/@.*/, "") // strip domain if email-like
      .split(/[.\s_-]+/)
      .filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [userName, email]);

  const isClubOwner = role === "club owner";

  const clubs = React.useMemo(
    () => [
      "Robotics Club",
      "Hiking Club",
      "Club",
      "Club",
      "Club",
      "Club",
      "Another Club",
      "And One More",
    ],
    []
  );

  const events = React.useMemo(
    () => [
      "Watch the Minecraft Movie",
      "Run the 10k Marathon",
      "Book Club Monthly Meeting",
      "Book Club Monthly Meeting",
      "Book Club Monthly Meeting",
      "Book Club Monthly Meeting",
      "Extra Event A",
      "Extra Event B",
    ],
    []
  );

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
          gap: 12,
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
            padding: 0,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
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
              pointerEvents: "none",
            }}
            draggable={false}
          />
        </button>
      </div>

      {/* Identity + account actions */}
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
          {/* Avatar + name/email */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flex: 1,
            }}
          >
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
                flexShrink: 0,
              }}
            >
              {initials || "?"}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#111827",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={userName}
              >
                {userName}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#6B7280",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={email}
              >
                {email || "No email"}
              </div>
              {role && (
                <span
                  style={{
                    marginTop: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    padding: "2px 8px",
                    borderRadius: 999,
                    border: "1px solid #E5E7EB",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 0.04,
                    color: "#4B5563",
                    background: "#F9FAFB",
                  }}
                >
                  {role}
                </span>
              )}
            </div>
          </div>

          {/* Manage button: only for club owners */}
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
                whiteSpace: "nowrap",
              }}
            >
              Manage Your Club
            </button>
          )}
        </div>

        {/* Account settings row */}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Account Settings
          </span>
          <button
            className="btn-link"
            onClick={onEditProfile}
            style={{
              padding: 0,
              background: "none",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              color: "#009C6A",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* My Clubs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            My Clubs
          </h3>
        </div>

        <div
          aria-label="My Clubs"
          style={{
            borderRadius: 12,
            border: "1px solid #E5E7EB",
            background: "#F9FAFB",
            maxHeight: 160,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {clubs.map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                padding: "6px 4px",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: "#111827",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </span>
              <button
                className="btn-link"
                onClick={() => onLeaveClub(name)}
                style={{
                  padding: "4px 8px",
                  fontSize: 13,
                  borderRadius: 999,
                  border: "1px solid #FCA5A5",
                  background: "rgba(254, 242, 242, 0.9)",
                  color: "#DC2626",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Leave
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Events */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          My Events
        </h3>

        <div
          aria-label="My Events"
          style={{
            borderRadius: 12,
            border: "1px solid #E5E7EB",
            background: "#F9FAFB",
            maxHeight: 160,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {events.map((event, i) => (
            <div
              key={i}
              className="panel-cta"
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                background: "#ffffff",
                border: "1px solid #E5E7EB",
                fontSize: 14,
                color: "#111827",
              }}
            >
              {event}
            </div>
          ))}
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
          disabled={!isAuthenticated}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
