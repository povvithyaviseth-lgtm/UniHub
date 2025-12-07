// src/components/.../ClubPanel.jsx
import { useState } from "react";

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
      style={{
        position: "relative",
        background: "#FFFFFF",
        borderRadius: 26,
        border: "1.7px solid #E5E7EB",
        boxShadow: hovered
          ? "0 10px 24px rgba(15, 23, 42, 0.14)"
          : "0 4px 12px rgba(15, 23, 42, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        minHeight: 320,
        width: "100%",
        maxWidth: 430,
      }}
      aria-label={`${name} card`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base content: image + name */}
      <div>
        <div
          style={{
            position: "relative",
            margin: 16,
            marginBottom: 10,
            borderRadius: 12,
            overflow: "hidden",
            background: "#227246",
            aspectRatio: "16 / 10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${name} cover`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 13,
                color: "#D1FAE5",
                padding: 8,
                textAlign: "center",
              }}
            >
              No image uploaded
            </span>
          )}
        </div>

        <div
          style={{
            padding: "0 16px 16px 16px",
          }}
        >
          <div
            style={{
              color: "#111827",
              fontSize: 35,
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
            }}
          >
            {name}
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.98)",
            color: "#0F172A",
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
