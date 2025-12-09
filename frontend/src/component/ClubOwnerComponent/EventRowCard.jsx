// src/component/ClubOwnerComponent/EventRowCard.jsx
import React from "react";

const API_BASE_URL = "http://localhost:5050";

function resolveImageSrc(image) {
  if (!image) return null;

  // already an absolute URL
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  let path = image.replace(/\\/g, "/");
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return `${API_BASE_URL}${path}`;
}

export default function EventRowCard({
  event,
  onRSVP,
  onOpenAttendance,
  onToggleStatus,
  onDelete,
}) {
  const {
    id,
    _id,
    title,
    date,
    startTime,
    location,
    description,
    image,
    status = "published",
  } = event || {};

  const eventId = id || _id;
  const imageSrc = resolveImageSrc(image);

  const handleToggleStatusClick = () => {
    if (!eventId) return;
    onToggleStatus && onToggleStatus(eventId);
  };

  const handleDeleteClick = () => {
    if (!eventId) return;
    onDelete && onDelete(eventId);
  };

  const handleAttendanceClick = () => {
    onOpenAttendance && onOpenAttendance(event);
  };

  const handleRSVPClick = () => {
    onRSVP && onRSVP(event);
  };

  const isDraft = status === "draft";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 12,
        padding: 12,
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        background: "#F9FAFB",
      }}
    >
      {/* Image */}
      {imageSrc && (
        <div
          style={{
            flex: "0 0 96px",
            height: 72,
            borderRadius: 12,
            overflow: "hidden",
            background: "#E5E7EB",
          }}
        >
          <img
            src={imageSrc}
            alt={title || "Event image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Main info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#111827",
            }}
          >
            {title || "Untitled event"}
          </div>

        </div>

        <div
          style={{
            fontSize: 12,
            color: "#6B7280",
          }}
        >
          {date && (
            <span>
              {date}
              {startTime ? ` · ${startTime}` : ""}
            </span>
          )}
          {date && location && " · "}
          {location && <span>{location}</span>}
        </div>

        {description && (
          <div
            style={{
              fontSize: 12,
              color: "#4B5563",
              marginTop: 2,
              maxWidth: 520,
            }}
          >
            {description}
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        <button
          type="button"
          onClick={handleRSVPClick}
          style={{
            borderRadius: 999,
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            color: "#111827",
          }}
        >
          View RSVPs
        </button>

        <button
          type="button"
          onClick={handleAttendanceClick}
          style={{
            borderRadius: 999,
            border: "1px solid #DCFCE7",
            background: "#ECFDF3",
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            color: "#166534",
          }}
        >
          Mark attendance
        </button>

        <div
          style={{
            display: "flex",
            gap: 6,
            marginTop: 4,
          }}
        >
    
          <button
            type="button"
            onClick={handleDeleteClick}
            style={{
              borderRadius: 999,
              border: "1px solid #FECACA",
              background: "#FEF2F2",
              padding: "3px 8px",
              fontSize: 11,
              cursor: "pointer",
              color: "#B91C1C",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
