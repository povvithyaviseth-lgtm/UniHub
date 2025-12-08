import React from "react";

/**
 * CreateEventModal
 * - Visual-only modal content for creating an event.
 * - Intended to be rendered inside <PopUpModals>.
 *
 * Props:
 *  - onSave(payload)   → called when form is valid and user clicks "Save event"
 *  - onCancel()        → called when user cancels/closes the modal
 */
export default function CreateEventModal({ onSave, onCancel }) {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [isOnline, setIsOnline] = React.useState(false);
  const [link, setLink] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Event name is required";
    if (!date) newErrors.date = "Date is required";
    if (!startTime) newErrors.startTime = "Start time is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave?.({
      title: title.trim(),
      date,
      startTime,
      endTime: endTime || null,
      location: location.trim(),
      isOnline,
      link: link.trim(),
      capacity: capacity ? Number(capacity) : null,
      description: description.trim(),
      status: "draft",
    });
  };

  return (
    <div
      className="cd-modal-shell"
      style={{
        width: "min(92vw, 560px)",
        maxHeight: "min(92vh, 660px)",
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
            fontSize: 20,
          }}
        >
          Create event
        </h2>
        <button
          type="button"
          onClick={onCancel}
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
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 14,
          color: "#111827",
        }}
      >
        {/* Event name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 500 }}>Event name *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Weekly study session"
            style={{
              borderRadius: 12,
              border: errors.title ? "1px solid #DC2626" : "1px solid #D1D5DB",
              padding: "10px 12px",
              fontSize: 14,
            }}
          />
          {errors.title && (
            <span style={{ fontSize: 12, color: "#DC2626" }}>
              {errors.title}
            </span>
          )}
        </div>

        {/* Date & time */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                borderRadius: 12,
                border: errors.date ? "1px solid #DC2626" : "1px solid #D1D5DB",
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
            {errors.date && (
              <span style={{ fontSize: 12, color: "#DC2626" }}>
                {errors.date}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontWeight: 500 }}>Start *</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                borderRadius: 12,
                border: errors.startTime
                  ? "1px solid #DC2626"
                  : "1px solid #D1D5DB",
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
            {errors.startTime && (
              <span style={{ fontSize: 12, color: "#DC2626" }}>
                {errors.startTime}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontWeight: 500 }}>End</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                borderRadius: 12,
                border: "1px solid #D1D5DB",
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
          </div>
        </div>

        {/* Location / online toggle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <label style={{ fontWeight: 500 }}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Room 204, Science Building"
                style={{
                  borderRadius: 12,
                  border: "1px solid #D1D5DB",
                  padding: "10px 12px",
                  fontSize: 14,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsOnline((prev) => !prev)}
              style={{
                whiteSpace: "nowrap",
                borderRadius: 999,
                border: "1px solid #D1D5DB",
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 500,
                background: isOnline ? "#ECFDF3" : "#F9FAFB",
                color: isOnline ? "#15803D" : "#4B5563",
                cursor: "pointer",
              }}
            >
              {isOnline ? "Online event" : "In-person"}
            </button>
          </div>

          {isOnline && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontWeight: 500 }}>Join link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Zoom / Meet link"
                style={{
                  borderRadius: 12,
                  border: "1px solid #D1D5DB",
                  padding: "10px 12px",
                  fontSize: 14,
                }}
              />
            </div>
          )}
        </div>

        {/* Capacity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 500 }}>
            Capacity{" "}
            <span style={{ fontWeight: 400, color: "#6B7280" }}>
              (optional)
            </span>
          </label>
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="30"
            style={{
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              padding: "10px 12px",
              fontSize: 14,
              maxWidth: 160,
            }}
          />
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontWeight: 500 }}>
            Description{" "}
            <span style={{ fontWeight: 400, color: "#6B7280" }}>
              (what should people expect?)
            </span>
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short summary of the event..."
            style={{
              resize: "vertical",
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              padding: "10px 12px",
              fontSize: 14,
            }}
          />
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          padding: 14,
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          background: "#F9FAFB",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            borderRadius: 999,
            border: "1px solid #D1D5DB",
            background: "#FFFFFF",
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            color: "#374151",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            borderRadius: 999,
            border: "none",
            background: "#00550A",
            padding: "8px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            color: "#FFFFFF",
          }}
        >
          Save event
        </button>
      </div>
    </div>
  );
}
