// src/component/PostEventPopUp.jsx
import React from "react";
import "../../index.css"; // ← ensure your global styles (fonts, buttons, hover/focus) are applied

export default function PostEventPopUp({
  onCancel = () => {},
  onCreate = () => {},
  title = "Post Event",
  confirmText = "Post Event",
  cancelText = "Cancel",
  initial = {}, // optional prefill: { name, location, startTime, tag, description }
}) {
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);

  // Prefill fields when editing
  React.useEffect(() => {
    setName(initial.name || "");
    setLocation(initial.location || "");
    setStartTime(initial.startTime || "");
    setTag(initial.tag || "");
    setDescription(initial.description || "");
  }, [initial]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) return setImageFile(null);
    if (f.type !== "image/png") {
      alert("Please select a PNG image (.png)");
      e.target.value = "";
      return setImageFile(null);
    }
    setImageFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only — parent can decide how to persist later
    onCreate({ name, location, startTime, tag, description, imageFile });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-event-title"
      style={{
        width: 1058,
        height: 921,
        position: "relative",
        background: "white",
        overflow: "hidden",
        borderRadius: 15,
        boxShadow: "0 25px 60px rgba(0,0,0,.25)",
      }}
    >
      {/* Green header bar */}
      <div style={{ width: 1108, height: 92, left: -27, top: 0, position: "absolute", background: "#00550A" }} />

      {/* Title */}
      <div
        id="post-event-title"
        style={{
          width: 424,
          height: 102,
          left: 286,
          top: 0,
          position: "absolute",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "white",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        {title}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Design canvas */}
        <div style={{ width: 989, height: 549, left: 33, top: 0, position: "absolute" }}>
          {/* Event Name */}
          <div style={{ width: 430, height: 89, left: 0, top: 113, position: "absolute" }}>
            <div style={{ color: "black", fontSize: 20, fontWeight: 400 }}>Event Name</div>
            <div
              className="search-input-wrap"
              style={{
                width: 988,
                height: 50,
                left: 0,
                top: 39,
                position: "absolute",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter event name"
                style={{
                  width: "100%",
                  height: 36,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#2A2A2A",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              />
            </div>
          </div>

          {/* Row: Image + Location */}
          <div style={{ width: 989, height: 89, left: 0, top: 225, position: "absolute" }}>
            {/* Image */}
            <div style={{ color: "black", fontSize: 20, fontWeight: 400 }}>Event Image</div>
            <div
              className="search-input-wrap"
              style={{
                width: 424,
                height: 50,
                left: 0,
                top: 39,
                position: "absolute",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                type="file"
                accept="image/png,.png"
                onChange={handleFileChange}
                style={{ width: "100%", border: "none", outline: "none", background: "transparent" }}
              />
            </div>

            {/* Location */}
            <div style={{ width: 440, height: 89, left: 494, top: 0, position: "absolute" }}>
              <div style={{ color: "black", fontSize: 20, fontWeight: 400 }}>Location</div>
              <div
                className="search-input-wrap"
                style={{
                  width: 424,
                  height: 50,
                  left: 0,
                  top: 39,
                  position: "absolute",
                  borderRadius: 10.02,
                  border: "1.5px #EEEEEE solid",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                }}
              >
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Event Location"
                  style={{
                    width: "100%",
                    height: 36,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#2A2A2A",
                    fontWeight: 700,
                    fontSize: 17,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tag (left) */}
          <div style={{ width: 440, height: 89, left: 0, top: 340, position: "absolute" }}>
            <div style={{ color: "black", fontSize: 20, fontWeight: 400 }}>Tag</div>
            <div
              className="search-input-wrap"
              style={{
                width: 424,
                height: 50,
                left: 0,
                top: 39,
                position: "absolute",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter Tag"
                style={{
                  width: "100%",
                  height: 36,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#2A2A2A",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              />
            </div>
          </div>

          {/* Time (right) */}
          <div style={{ width: 440, height: 89, left: 494, top: 340, position: "absolute" }}>
            <div style={{ color: "black", fontSize: 20, fontWeight: 400 }}>Time</div>
            <div
              className="search-input-wrap"
              style={{
                width: 424,
                height: 50,
                left: 0,
                top: 39,
                position: "absolute",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Enter Event Start Time"
                style={{
                  width: "100%",
                  height: 36,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#2A2A2A",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ width: 674, height: 89, left: 0, top: 460, position: "absolute" }}>
            <div style={{ color: "black", fontSize: 20, fontWeight: 400 }}>Event Description</div>
            <div
              className="search-input-wrap"
              style={{
                width: 984,
                height: 287,
                left: 0,
                top: 39,
                position: "absolute",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
                padding: "8px 10px",
              }}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter club description"
                rows={6}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  background: "transparent",
                  color: "#2A2A2A",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              />
            </div>
          </div>

          {/* Divider (uses your .hr for color/thickness/spacing) */}
          <div className="hr" style={{ width: 986, left: 0, top: 816, position: "absolute", margin: 0 }} />
        </div>

        {/* Bottom buttons — primary uses your .btn-primary */}
        <div style={{ width: 441, height: 58, left: 584, top: 834, position: "absolute" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              width: 199,
              height: 55.04,
              position: "absolute",
              left: 0,
              top: 1.69,
              background: "#E1E1E3",
              borderRadius: 6.77,
              color: "#6B6767",
              fontSize: 27.1,
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
              position: "absolute",
              left: 232,
              top: 3,
              borderRadius: 8,
              fontSize: 27,
            }}
          >
            {confirmText}
          </button>
        </div>
      </form>
    </div>
  );
}
