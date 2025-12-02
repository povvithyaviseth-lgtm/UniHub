import React from "react";

/**
 * @typedef {Object} ClubDraft
 * @property {string} name
 * @property {string} slug
 * @property {string} tag
 * @property {string} description
 * @property {('png'|null)} imageExt
 * @property {number|null} imageSize
 * @property {string} status
 * @property {string} createdAt
 */

// simple slug
const slugify = (s) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// tag options as you had them
const TAG_OPTIONS = [
  "Academic",
  "Arts",
  "Culture",
  "Career",
  "Service",
  "Social",
  "Sports",
  "Technology",
  "Wellness",
  "Leadership",
  "Environmental",
  "Hobbies",
];

// Build the backend object
const buildClubDraft = ({ name, tag, description, imageFile }) => ({
  // backend name stored as-is from caller (we pass lowercase below)
  name: name.trim(),
  slug: slugify(name),
  tag: tag.trim(),
  description: description.trim(),
  imageExt: imageFile ? "png" : null,
  imageSize: imageFile?.size ?? null,
  status: "pending",
  createdAt: new Date().toISOString(),
});

export default function CreateClubPopUp({
  onCancel = () => {},
  onCreate = () => {},
  title = "Create Club",
  confirmText = "Create Club",
  cancelText = "Cancel",
  // NEW: initial values for edit mode
  initialName = "",
  initialDescription = "",
  initialTags = [],
  initialImageUrl = "",
}) {
  // raw = what user types (for display/title-style feel)
  const [nameRaw, setNameRaw] = React.useState(initialName);
  // name = normalized lowercase for backend/slug
  const [name, setName] = React.useState(
    initialName ? initialName.toLowerCase() : ""
  );
  const [nameWarning, setNameWarning] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState(initialTags || []);
  const [tagWarning, setTagWarning] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(initialImageUrl || "");
  const [imageFile, setImageFile] = React.useState(null);
  const [description, setDescription] = React.useState(
    initialDescription || ""
  );

  const prevUrlRef = React.useRef(null);

  // keep state in sync if initial props change (e.g. edit mode)
  React.useEffect(() => {
    setNameRaw(initialName);
    setName(initialName ? initialName.toLowerCase() : "");
  }, [initialName]);

  React.useEffect(() => {
    setDescription(initialDescription || "");
  }, [initialDescription]);

  React.useEffect(() => {
    setImageUrl(initialImageUrl || "");
  }, [initialImageUrl]);

  React.useEffect(() => {
    if (prevUrlRef.current && prevUrlRef.current !== imageUrl) {
      URL.revokeObjectURL(prevUrlRef.current);
    }
    prevUrlRef.current = imageUrl;
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, [imageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setImageFile(null);
      setImageUrl(initialImageUrl || "");
      return;
    }
    if (file.type !== "image/png") {
      alert("Please select a PNG image (.png)");
      e.target.value = "";
      return;
    }
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleNameChange = (e) => {
    let raw = e.target.value;

    if (raw.length > 25) {
      raw = raw.slice(0, 25);
      setNameWarning("Maximum 25 characters reached");
    } else {
      setNameWarning("");
    }

    // store what user sees
    setNameRaw(raw);
    // store lowercase for backend/slug
    setName(raw.toLowerCase());
  };

  const handleTagSelect = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (selectedTags.includes(value)) {
      setTagWarning("That tag is already selected.");
      e.target.value = "";
      return;
    }

    if (selectedTags.length >= 2) {
      setTagWarning("You can only select 2 tags.");
      e.target.value = "";
      return;
    }

    setSelectedTags((prev) => [...prev, value]);
    setTagWarning("");
    e.target.value = "";
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
    setTagWarning("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagString = selectedTags.join(", ");

    const draft = buildClubDraft({
      name, // lowercase version
      tag: tagString,
      description,
      imageFile,
    });

    onCreate({
      // still sending lowercase name to consumer
      name: name.toLowerCase(),
      tag: tagString,
      imageUrl,
      imageFile,
      description,
      draft,
    });
  };

  return (
    <div
      style={{
        width: "min(92vw, 500px)",
        maxHeight: "min(92vh, 922px)",
        background: "white",
        borderRadius: 15,
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0,0,0,.25)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-club-title"
    >
      <div
        style={{
          background: "#00550A",
          minHeight: 72,
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
            fontSize: "clamp(24px, 6vw, 48px)",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <div style={{ padding: 20, display: "grid", rowGap: 18 }}>
          {/* Name */}
          <div style={{ display: "grid", rowGap: 4 }}>
            <label style={{ color: "black", fontSize: 20 }}>Club Name</label>

            <div
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
                type="text"
                value={nameRaw}
                onChange={handleNameChange}
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

            <div
              style={{
                fontSize: 12,
                marginTop: 2,
                color: nameWarning ? "#D32F2F" : "#888",
              }}
            >
              {nameWarning || `${25 - nameRaw.length} characters remaining`}
            </div>
          </div>

          {/* Image */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label style={{ color: "black", fontSize: 20 }}>Club Image</label>

            <div
              style={{
                border: "1.5px #EEEEEE solid",
                borderRadius: 10,
                minHeight: 50,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                gap: 10,
              }}
            >
              <input
                type="file"
                name="image"
                accept="image/png"
                onChange={handleFileChange}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                }}
              />
            </div>

            {imageUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={imageUrl}
                  alt="club preview"
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                    background: "#F0F0F0",
                  }}
                />
                <div style={{ color: "#707070", fontSize: 14 }}>
                  {imageFile?.name}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: "grid", rowGap: 6 }}>
            <label style={{ color: "black", fontSize: 20 }}>Tags</label>

            <div style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "2px 6px",
                  display: "inline-flex",
                  maxWidth: "50%",
                }}
              >
                <select
                  onChange={handleTagSelect}
                  defaultValue=""
                  style={{
                    height: 28,
                    border: "none",
                    outline: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>
                    select 2 tags
                  </option>

                  {TAG_OPTIONS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  maxHeight: 90,
                  overflowY: "auto",
                }}
              >
                {selectedTags.length === 0 ? (
                  <div style={{ fontSize: 12, color: "#888" }} />
                ) : (
                  selectedTags.map((tag) => (
                    <div
                      key={tag}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "#F0F4F8",
                        border: "1px solid #E0E4EA",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {tagWarning && (
              <div style={{ fontSize: 12, color: "#D32F2F" }}>
                {tagWarning}
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label style={{ color: "black", fontSize: 20 }}>Description</label>

            <div
              style={{
                border: "1.5px #EEEEEE solid",
                borderRadius: 10,
                minHeight: 120,
                padding: "8px 10px",
              }}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

        {/* Footer buttons */}
        <div style={{ margin: "0 20px 12px 20px" }} className="hr" />

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
