// src/component/ClubOwnerComponent/CreateEventModal.jsx
import React from "react";

export default function CreateEventModal({ onSave, onCancel }) {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  // 🔊 Debug: this proves this file is actually being used
  React.useEffect(() => {
    console.log("✅ CreateEventModal (updated) mounted");
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImageFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Event title is required");
      return;
    }
    if (!date) {
      setError("Event date is required");
      return;
    }
    if (!location.trim()) {
      setError("Event location is required");
      return;
    }

    try {
      setSubmitting(true);
      await onSave({
        title: title.trim(),
        date,
        startTime,
        location: location.trim(),
        description: description.trim(),
        imageFile,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 520,
        padding: 20,
        borderRadius: 18,
        background: "#FFFFFF",
        boxShadow: "0 20px 60px rgba(15,23,42,0.24)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Create event 
      </div>

      {error && (
        <div
          style={{
            fontSize: 13,
            color: "#B91C1C",
            background: "#FEF2F2",
            borderRadius: 8,
            padding: "8px 10px",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#111827",
            }}
          >
            Event name<span style={{ color: "#DC2626" }}> *</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Monthly Valorant Tournament"
            style={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "8px 10px",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Date + Start time */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1 1 160px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <label
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#111827",
              }}
            >
              Date<span style={{ color: "#DC2626" }}> *</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                borderRadius: 10,
                border: "1px solid #E5E7EB",
                padding: "8px 10px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              flex: "1 1 140px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <label
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#111827",
              }}
            >
              Start time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                borderRadius: 10,
                border: "1px solid #E5E7EB",
                padding: "8px 10px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Location */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#111827",
            }}
          >
            Location<span style={{ color: "#DC2626" }}> *</span>
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Campus room, Discord server, etc."
            style={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "8px 10px",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#111827",
            }}
          >
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell members what this event is about..."
            style={{
              borderRadius: 10,
              border: "1px solid #E5E7EB",
              padding: "8px 10px",
              fontSize: 13,
              resize: "vertical",
              minHeight: 70,
              outline: "none",
            }}
          />
        </div>

        {/* Image upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#111827",
            }}
          >
            Event image
            <span style={{ fontWeight: 400, color: "#6B7280" }}>
              {" "}

            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              fontSize: 13,
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 8,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              borderRadius: 999,
              border: "1px solid #E5E7EB",
              background: "#F9FAFB",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              color: "#111827",
            }}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              borderRadius: 999,
              border: "none",
              background: "#00550A",
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              color: "#F9FAFB",
              opacity: submitting ? 0.75 : 1,
            }}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create event"}
          </button>
        </div>
      </form>
    </div>
  );
}
