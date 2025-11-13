// src/components/CreateClubDialog.jsx
import React from "react";

/**
 * CreateClubDialog
 * - Responsive: caps size but fluid with viewport.
 * - Green header with centered "Club Creation" text (no clipping).
 * - Uses index.css button classes where appropriate.
 * - Calls onCreate(payload) and onCancel().
 */
export default function CreateClubDialog({
  onCancel = () => {},
  onCreate = () => {},
  title = "Club Creation",
  confirmText = "Create Club",
  cancelText = "Cancel",
}) {
  const [name, setName] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate as needed before sending
    onCreate({ name, tag, imageUrl, description });
  };

  return (
    <div
      style={{
        // Keep the dialog roughly the size you designed, but prevent clipping on small screens
        width: "min(92vw, 500px)",
        maxHeight: "min(92vh, 922px)",
        background: "white",
        borderRadius: 15,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0,0,0,.25)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-club-title"
    >
      {/* Header bar – green with centered text */}
      <div
        style={{
          background: "#00550A",
          minHeight: 72, // slightly smaller than 81 but with padding; prevents text clipping
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
        }}
      >
        <h1
          id="create-club-title"
          style={{
            margin: 0,
            color: "white",
            fontWeight: 700,
            // Responsive but capped so it fits within the bar
            fontSize: "clamp(24px, 6vw, 48px)",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ padding: 20, display: "grid", rowGap: 18 }}>
          {/* Club Name */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-name" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Club Name
            </label>
            <div
              className="search-input-wrap"
              style={{
                border: "1.5px #EEEEEE solid",
                borderRadius: 10,
                height: 50,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                id="club-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter club name"
                style={{
                  width: "100%",
                  height: 36,
                  border: "none",
                  outline: "none",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#2A2A2A",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Club Image */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-image" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Club Image
            </label>
            <div
              className="search-input-wrap"
              style={{
                border: "1.5px #EEEEEE solid",
                borderRadius: 10,
                height: 50,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                id="club-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="http://"
                style={{
                  width: "100%",
                  height: 36,
                  border: "none",
                  outline: "none",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#2A2A2A",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Tag */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-tag" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Tag
            </label>
            <div
              className="search-input-wrap"
              style={{
                border: "1.5px #EEEEEE solid",
                borderRadius: 10,
                height: 50,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                id="club-tag"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter Tag"
                style={{
                  width: "100%",
                  height: 36,
                  border: "none",
                  outline: "none",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#2A2A2A",
                  background: "transparent",
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-desc" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Description
            </label>
            <div
              className="search-input-wrap"
              style={{
                border: "1.5px #EEEEEE solid",
                borderRadius: 10,
                minHeight: 120,
                padding: "8px 10px",
              }}
            >
              <textarea
                id="club-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter club description"
                rows={6}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#2A2A2A",
                  background: "transparent",
                }}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hr" style={{ margin: "0 20px 12px 20px" }} />

        {/* Footer buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "space-between",
            padding: "0 20px 20px 20px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              width: 199,
              height: 55,
              borderRadius: 8,
              background: "#E1E1E3",
              color: "#6B6767",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {cancelText}
          </button>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: 209,
              height: 53,
              borderRadius: 8,
              fontSize: 24,
            }}
          >
            {confirmText}
          </button>
        </div>
      </form>
    </div>
  );
}
