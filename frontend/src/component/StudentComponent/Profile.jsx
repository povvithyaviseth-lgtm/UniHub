// src/components/Profile.jsx  (or src/pages/Profile.jsx)
import React from "react";
import closeImg from "../../images/Close.png";

/**
 * Profile
 * - Presentational modal body.
 * - Delegates navigation via props (parent should pass onManageClub to push `/clubManage`).
 *
 * Example parent usage:
 * <Profile onManageClub={() => { setProfileOpen(false); navigate('/clubManage'); }} />
 */
export default function Profile({
  onClose = () => {},
  onEditProfile = () => {},
  onLeaveClub = () => {},
  onManageClub = () => {}, // ← parent wires navigation here
}) {
  const baseW = 598.92;
  const baseH = 814;

  const CARD_PAD = 20;
  const RIGHT_PAD = 16;
  const NAME_LEFT = 118.03;

  const clubs = [
    "Robotics Club",
    "Hiking Club",
    "Club",
    "Club",
    "Club",
    "Club",
    "Another Club",
    "And One More",
  ];

  return (
    <div
      style={{
        width: baseW,
        height: baseH,
        background: "white",
        overflow: "hidden",
        borderRadius: 17.49,
        boxShadow: "0 10px 30px rgba(0,0,0,.06)",
        position: "relative",
      }}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 72,
          height: 72,
          padding: 12,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
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

      {/* Full-size content canvas with uniform inset padding */}
      <div
        style={{
          position: "absolute",
          inset: CARD_PAD,
        }}
      >
        {/* Title */}
        <div
          style={{
            left: 0,
            top: 6.12,
            position: "absolute",
            color: "#00550A",
            fontSize: 30.53,
            fontFamily: "Inter",
            fontWeight: 700,
          }}
        >
          My Profile
        </div>

        {/* Section headers */}
        <div
          style={{
            left: 7.87,
            top: 319.13,
            position: "absolute",
            color: "black",
            fontSize: 23.61,
            fontFamily: "Inter",
            fontWeight: 700,
          }}
        >
          My Clubs
        </div>

        <div
          style={{
            left: 6.12,
            top: 506.24,
            position: "absolute",
            color: "black",
            fontSize: 23.61,
            fontFamily: "Inter",
            fontWeight: 700,
          }}
        >
          My Events
        </div>

        {/* Identity block */}
        <div style={{ left: 0, right: 0, height: 162.63, top: 53.33, position: "absolute" }}>
          <div style={{ left: 0, right: 0, height: 2.62, top: 0, position: "absolute", background: "#E4E4E4" }} />
          <div style={{ left: 0, right: 0, height: 1.75, top: 160.88, position: "absolute", background: "#F4F4F4" }} />

          <div style={{ width: 78.69, height: 78.69, left: 21.86, top: 34.1, position: "absolute" }}>
            <div
              style={{
                width: 78.69,
                height: 78.69,
                left: 0,
                top: 7.87,
                position: "absolute",
                background: "#8FAAFF",
                outline: "1.89px #00550A solid",
                borderRadius: 12,
              }}
            />
            <div
              style={{
                width: 78.69,
                height: 78.69,
                left: 0,
                top: 7.87,
                position: "absolute",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "#00550A",
                fontSize: 30.22,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              JD
            </div>
          </div>

          {/* Name — constrained to right edge */}
          <div
            style={{
              left: NAME_LEFT,
              right: RIGHT_PAD,
              top: 50.71,
              height: 41.09,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              color: "black",
              fontSize: 30.22,
              fontFamily: "Inter",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title="Peter Demonte"
          >
            Peter Demonte
          </div>

          {/* Email — constrained to right edge */}
          <div
            className="text-muted"
            style={{
              left: NAME_LEFT,
              right: RIGHT_PAD,
              top: 91.8,
              height: 20.11,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              fontSize: 17.49,
              fontFamily: "Inter",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title="peter.demonte@csus.edu"
          >
            peter.demonte@csus.edu
          </div>

          {/* Manage button — now navigates via onManageClub */}
          <button
            className="btn-primary"
            style={{
              height: 41.09,
              right: RIGHT_PAD,
              top: 64.26,
              position: "absolute",
              borderRadius: 11.37,
              padding: "0 16px",
            }}
            onClick={onManageClub}
          >
            Manage Your Club
          </button>
        </div>

        {/* Account settings header + Edit link */}
        <div
          style={{
            left: 11.37,
            top: 236.07,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            color: "#707070",
            fontSize: 23.61,
            fontFamily: "Inter",
            fontWeight: 400,
          }}
        >
          Account Settings
        </div>

        <button
          className="btn-link"
          style={{
            right: RIGHT_PAD,
            top: 236.07,
            position: "absolute",
            textAlign: "right",
            color: "#009C6A",
            fontSize: 23.61,
            fontFamily: "Inter",
            fontWeight: 700,
          }}
          onClick={onEditProfile}
        >
          Edit Profile&nbsp;
        </button>

        {/* Divider */}
        <div style={{ left: 0, right: 0, height: 1.75, top: 297.27, position: "absolute", background: "#F4F4F4" }} />

        {/* Clubs box */}
        <div
          style={{
            left: 6.12,
            right: 6.12,
            height: 121.53,
            top: 364.6,
            position: "absolute",
            background: "#F4F4F4",
            overflow: "hidden",
            borderRadius: 8.74,
            outline: "0.87px #E0E0E0 solid",
            outlineOffset: "-0.87px",
            display: "flex",
            flexDirection: "column",
          }}
          aria-label="My Clubs"
        >
          <div style={{ height: 8 }} />
          <div style={{ padding: "0 12px", fontWeight: 700, color: "#2a2a2a" }}>Your Clubs</div>
          <div className="hr" style={{ margin: "8px 12px" }} />
          <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 10px 12px" }}>
            {clubs.map((name, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 0",
                }}
              >
                <div style={{ color: "black", fontSize: 20.98, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {name}
                </div>
                <button className="btn-link" style={{ color: "#E50000" }} onClick={() => onLeaveClub(name)}>
                  Leave
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Events box */}
        <div
          style={{
            left: 6.12,
            right: 6.12,
            height: 121.53,
            top: 555.2,
            position: "absolute",
            background: "#F4F4F4",
            overflow: "hidden",
            borderRadius: 8.74,
            outline: "0.87px #E0E0E0 solid",
            outlineOffset: "-0.87px",
            display: "flex",
            flexDirection: "column",
          }}
          aria-label="My Events"
        >
          <div style={{ height: 8 }} />
          <div style={{ padding: "0 12px", fontWeight: 700, color: "#2a2a2a" }}>Upcoming Events</div>
          <div className="hr" style={{ margin: "8px 12px" }} />
          <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 10px 12px" }}>
            {[
              "Watch the Minecraft Movie",
              "Run the 10k Marathon",
              "Book Club Monthly Meeting",
              "Book Club Monthly Meeting",
              "Book Club Monthly Meeting",
              "Book Club Monthly Meeting",
              "Extra Event A",
              "Extra Event B",
            ].map((event, i) => (
              <div key={i} className="panel-cta" style={{ padding: "10px 12px", marginBottom: 8 }}>
                {event}
              </div>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <div style={{ left: 6.12, right: 6.12, height: 51.59, top: 696.84, position: "absolute" }}>
          <button
            style={{
              width: "100%",
              height: 43.72,
              position: "absolute",
              left: 0,
              top: 4.37,
              background: "rgba(30, 64, 175, 0)",
              borderRadius: 8.76,
              border: "1.31px #FF0000 solid",
              color: "#FF1F1F",
              fontSize: 21.89,
            }}
            onClick={() => alert("Sign Out")}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
