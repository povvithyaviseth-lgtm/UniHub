// src/component/ClubOwnerComponent/AnnouncementItem.jsx
import React from "react";

/**
 * Presentational card for a single announcement.
 * VISUALS:
 * - Matches the announcement block from the green design version
 * - Text, created date, status (Draft / Posted)
 * - Actions: Post/Edit, Delete
 */
export default function AnnouncementItem({
  announcement,
  onToggleStatus,
  onDelete,
}) {
  if (!announcement) return null;

  const isPublished = announcement.status === "published";
  const primaryLabel = isPublished ? "Edit" : "Post";

  const dateStr = announcement.createdAt
    ? new Date(announcement.createdAt + "T00:00:00").toLocaleDateString(
        undefined,
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : "";

  const subtleTextButton = {
    border: "none",
    background: "transparent",
    padding: 0,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#4B5563",
  };

  const dangerTextButton = {
    ...subtleTextButton,
    color: "#B91C1C",
  };

  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        background: "#FFFFFF",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "#111827",
              whiteSpace: "pre-wrap",
            }}
          >
            {announcement.text}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
            minWidth: 80,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            {dateStr}
          </span>
          <span
            style={{
              fontSize: 11,
              color: isPublished ? "#15803D" : "#6B7280",
            }}
          >
            {isPublished ? "Posted" : "Draft"}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
        }}
      >
        <button
          type="button"
          style={subtleTextButton}
          onClick={() => onToggleStatus && onToggleStatus(announcement.id)}
        >
          {primaryLabel}
        </button>
        <button
          type="button"
          style={dangerTextButton}
          onClick={() => onDelete && onDelete(announcement.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
