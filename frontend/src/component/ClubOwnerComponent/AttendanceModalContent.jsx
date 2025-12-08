// src/component/ClubOwnerComponent/AttendanceModalContent.jsx
import React from "react";

/**
 * "Mark attendance" modal content, used inside <PopUpModals>.
 * VISUALS:
 * - Matches the green header + "Done" button styling from the design version
 *
 * Behavior:
 * - Shows event title
 * - Shows members with Present/Absent + checkbox
 */
export default function AttendanceModalContent({
  event,
  members,
  attendanceByEvent,
  onToggleAttendance,
  onClose,
}) {
  const eventId = event?.id;

  const doneButtonStyle = {
    borderRadius: 999,
    border: "none",
    background: "#00550A",
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    color: "#F9FAFB",
  };

  return (
    <div
      style={{
        width: "min(92vw, 520px)",
        maxHeight: "min(92vh, 620px)",
        background: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#00550A",
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          Mark attendance
        </h2>
        <button
          type="button"
          onClick={onClose}
          style={{
            border: "none",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "4px 10px",
            color: "#E5E7EB",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {event && (
          <div
            style={{
              marginBottom: 8,
              fontSize: 13,
              color: "#4B5563",
            }}
          >
            Event:{" "}
            <span style={{ fontWeight: 600, color: "#111827" }}>
              {event.title}
            </span>
          </div>
        )}

        {members.length === 0 ? (
          <p style={{ fontSize: 13, color: "#4B5563" }}>
            No members to mark attendance for.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxHeight: 360,
              overflowY: "auto",
            }}
          >
            {members.map((member) => {
              const eventAttendance = attendanceByEvent[eventId] || {};
              const isPresent = !!eventAttendance[member.id];

              return (
                <label
                  key={member.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: "#111827",
                      wordBreak: "break-all",
                    }}
                  >
                    {member.email}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: isPresent ? "#15803D" : "#6B7280",
                      }}
                    >
                      {isPresent ? "Present" : "Absent"}
                    </span>
                    <input
                      type="checkbox"
                      checked={isPresent}
                      onChange={() =>
                        onToggleAttendance &&
                        onToggleAttendance(eventId, member.id)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </label>
              );
            })}
          </div>
        )}

        <div
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button type="button" onClick={onClose} style={doneButtonStyle}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
