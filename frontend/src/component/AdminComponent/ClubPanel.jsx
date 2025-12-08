// src/components/.../ClubPanel.jsx
import { useState } from "react";
import "../../index.css"; // ✅ ensure global + club-card styles are loaded

export const ClubPanel = ({ name, img, description, tag, onApprove }) => {
  const [hovered, setHovered] = useState(false);
  const [actionState, setActionState] = useState("idle"); // 'idle' | 'approved' | 'denied'

  const imageSrc = img || null;

  // Split tags by comma for display
  const rawTag = tag || "";
  const tagLines = rawTag
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleApproveClick = (e) => {
    e.stopPropagation();
    setActionState("approved");
    if (onApprove) onApprove("approved"); // or "Approved" depending on backend
  };

  const handleDenyClick = (e) => {
    e.stopPropagation();
    setActionState("denied");
    if (onApprove) onApprove("denied"); // or "Rejected" / "Denied" depending on backend
  };

  return (
    <article
      className="club-card club-card--owner" // ✅ uses your .club-card CSS now
      aria-label={`${name} card`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base content: image + name */}
      <div className="club-card-main">
        <div className="club-card-cover">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${name} cover`}
              className="club-card-cover-image"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="club-card-cover-placeholder">
              No image uploaded
            </span>
          )}
        </div>

        <div className="club-card-title-wrap">
          <div className="club-card-title">{name}</div>
        </div>
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div
          className="club-card-overlay"
          style={{
            // reuse your fade-up animation used elsewhere
            opacity: 0,
            animation: "cdFadeUpList 0.28s ease-out",
            animationFillMode: "forwards",
            // plus some spacing tweaks specific to this admin overlay
            display: "flex",
            flexDirection: "column",
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          {/* Header: name + tags */}
          <div
            style={{
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 35,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </div>

            {tagLines.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 15,
                }}
              >
                {tagLines.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "7px 8px",
                      borderRadius: 999,
                      border: "1px solid #E5E7EB",
                      background: "#F9FAFB",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#006f32ff",
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Body: description (scrollable) */}
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#4B5563",
              marginBottom: 12,
              flex: 1,
              maxHeight: 140,
              overflowY: "auto",
            }}
          >
            {description || "No description provided."}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "#E5E7EB",
              marginBottom: 10,
              marginTop: 2,
            }}
          />

          {/* Footer: approve / deny buttons or confirmation */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 8,
            }}
          >
            {actionState === "idle" && (
              <>
                <button
                  onClick={handleDenyClick}
                  style={{
                    padding: "9px 20px",
                    borderRadius: 999,
                    border: "1px solid #F87171",
                    background: "#FEF2F2",
                    color: "#B91C1C",
                    fontWeight: 500,
                    fontSize: 18,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Deny
                </button>

                <button
                  onClick={handleApproveClick}
                  style={{
                    padding: "9px 30px",
                    borderRadius: 999,
                    border: "none",
                    background: "#0D6C30",
                    color: "white",
                    fontWeight: 500,
                    fontSize: 18,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Approve
                </button>
              </>
            )}

            {actionState === "approved" && (
              <span
                style={{
                  padding: "9px 24px",
                  borderRadius: 999,
                  background: "#DCFCE7",
                  color: "#166534",
                  fontWeight: 600,
                  fontSize: 16,
                  whiteSpace: "nowrap",
                }}
              >
                Club approved!
              </span>
            )}

            {actionState === "denied" && (
              <span
                style={{
                  padding: "9px 24px",
                  borderRadius: 999,
                  background: "#FEF2F2",
                  color: "#B91C1C",
                  fontWeight: 600,
                  fontSize: 16,
                  whiteSpace: "nowrap",
                }}
              >
                Club denied!
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
};
