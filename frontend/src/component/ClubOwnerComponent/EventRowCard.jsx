// src/component/ClubOwnerComponent/EventRowCard.jsx
import React from "react";

/**
 * Presentational card for a single event row in the club dashboard.
 * VISUALS:
 * - Matches the inline event card from the green design version
 * - Title, date/time/location chips, description preview
 * - Status pill (Draft / Posted)
 * - Actions: RSVP / Mark attendance / Post-Edit / Delete
 *
 * Behavior is controlled via callback props passed from the page.
 */
export default function EventRowCard({
  event,
  onRSVP,
  onOpenAttendance,
  onToggleStatus,
  onDelete,
}) {
  if (!event) return null;

  const isPublished = event.status === "published";

  const dateStr = event.date
    ? new Date(event.date + "T00:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const timeStr = event.startTime
    ? `${event.startTime.slice(0, 5)}${
        event.endTime ? ` – ${event.endTime.slice(0, 5)}` : ""
      }`
    : "";

  const primaryLabel = isPublished ? "Edit" : "Post";

  // Button styles exactly as in the green version
  const pillButton = {
    borderRadius: 999,
    padding: "6px 12px",
    border: "none",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
  };

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
        borderRadius: 18,
        border: "1px solid #E5E7EB",
        background: "#FFFFFF",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#111827",
              wordBreak: "break-word",
            }}
          >
            {event.title}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              fontSize: 12,
              color: "#6B7280",
              marginTop: 6,
            }}
          >
            {dateStr && (
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 999,
                  background: "#F3F4F6",
                }}
              >
                {dateStr}
              </span>
            )}
            {timeStr && (
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 999,
                  background: "#F3F4F6",
                }}
              >
                {timeStr}
              </span>
            )}
            {event.location && (
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: 999,
                  background: "#F3F4F6",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: 220,
                }}
              >
                {event.location}
              </span>
            )}
          </div>

          {event.description && (
            <p
              style={{
                margin: 8,
                marginLeft: 0,
                fontSize: 13,
                color: "#4B5563",
                maxHeight: 44,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {event.description}
            </p>
          )}
        </div>

        {/* Status pill */}
        <span
          style={{
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 999,
            background: isPublished ? "#ECFDF3" : "#F3F4F6",
            color: isPublished ? "#15803D" : "#6B7280",
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          {isPublished ? "Posted" : "Draft"}
        </span>
      </div>

      {/* Actions row: RSVP / Mark attendance / Edit-Post / Delete */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 4,
          flexWrap: "wrap",
        }}
      >
        {/* RSVP */}
        <button
          type="button"
          style={{
            ...pillButton,
            background: "#EEF2FF",
            color: "#3730A3",
          }}
          onClick={() => onRSVP && onRSVP(event)}
        >
          RSVP
        </button>

        {/* Mark attendance */}
        <button
          type="button"
          style={{
            ...pillButton,
            background: "#ECFDF3",
            color: "#166534",
          }}
          onClick={() => onOpenAttendance && onOpenAttendance(event)}
        >
          Mark attendance
        </button>

        {/* Post / Edit */}
        <button
          type="button"
          style={subtleTextButton}
          onClick={() => onToggleStatus && onToggleStatus(event.id)}
        >
          {primaryLabel}
        </button>

        {/* Delete */}
        <button
          type="button"
          style={dangerTextButton}
          onClick={() => onDelete && onDelete(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
