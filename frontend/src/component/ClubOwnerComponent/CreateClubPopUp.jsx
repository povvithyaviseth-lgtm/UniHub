// src/component/CreateClubPopUp.jsx
import React from "react";

/**
 * @typedef {Object} ClubDraft
 * @property {string} name
 * @property {string} slug
 * @property {string} tag
 * @property {string} description
 * @property {('png'|null)} imageExt
 * @property {number|null} imageSize
 * @property {string} status           // 'pending' by default
 * @property {string} createdAt        // ISO string
 */

// simple, safe slug
const slugify = (s) =>
  s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** Build the minimal backend shape from UI inputs (no uploading here). */
const buildClubDraft = ({ name, tag, description, imageFile }) =>
  /** @type {ClubDraft} */ ({
    name: name.trim(),
    slug: slugify(name),
    tag: tag.trim(),
    description: description.trim(),
    imageExt: imageFile ? "png" : null,       // we only accept PNGs
    imageSize: imageFile?.size ?? null,       // bytes
    status: "pending",                        // or 'draft' if you prefer
    createdAt: new Date().toISOString(),
  });

export default function CreateClubPopUp({
  onCancel = () => {},
  onCreate = () => {},
  title = "Club Creation",
  confirmText = "Create Club",
  cancelText = "Cancel",
}) {
  const [name, setName] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");   // preview URL
  const [imageFile, setImageFile] = React.useState(null);
  const [description, setDescription] = React.useState("");

  const prevUrlRef = React.useRef(null);

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
      setImageUrl("");
      return;
    }
    if (file.type !== "image/png") {
      alert("Please select a PNG image (.png)");
      e.target.value = "";
      setImageFile(null);
      setImageUrl("");
      return;
    }
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // minimal backend-ready shape
    const draft = buildClubDraft({ name, tag, description, imageFile });

    // keep your existing payload fields exactly the same, just add `draft`
    onCreate({
      name,
      tag,
      imageUrl,     // preview URL (optional downstream)
      imageFile,    // actual file for upload later
      description,
      draft,        // 👈 minimal DB/backend variables for later
    });
  };

  return (
    <div
      style={{
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ padding: 20, display: "grid", rowGap: 18 }}>
          {/* Club Name */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-name" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Club Name
            </label>
            <div className="search-input-wrap" style={{ border: "1.5px #EEEEEE solid", borderRadius: 10, height: 50, display: "flex", alignItems: "center", padding: "0 10px" }}>
              <input
                id="club-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter club name"
                style={{ width: "100%", height: 36, border: "none", outline: "none", fontWeight: 700, fontSize: 17, color: "#2A2A2A", background: "transparent" }}
              />
            </div>
          </div>

          {/* Club Image (PNG upload) */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-image" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Club Image (PNG)
            </label>
            <div className="search-input-wrap" style={{ border: "1.5px #EEEEEE solid", borderRadius: 10, minHeight: 50, display: "flex", alignItems: "center", padding: "0 10px", gap: 10 }}>
              <input
                id="club-image"
                type="file"
                accept="image/png,.png"
                onChange={handleFileChange}
                style={{ flex: 1, border: "none", outline: "none", background: "transparent" }}
              />
            </div>
            {imageUrl && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src={imageUrl} alt="Selected club preview" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, background: "#F0F0F0" }} />
                <div style={{ color: "#707070", fontSize: 14 }}>{imageFile?.name || "selected.png"}</div>
              </div>
            )}
          </div>

          {/* Tag */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-tag" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Tag
            </label>
            <div className="search-input-wrap" style={{ border: "1.5px #EEEEEE solid", borderRadius: 10, height: 50, display: "flex", alignItems: "center", padding: "0 10px" }}>
              <input
                id="club-tag"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter Tag"
                style={{ width: "100%", height: 36, border: "none", outline: "none", fontWeight: 700, fontSize: 17, color: "#2A2A2A", background: "transparent" }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ display: "grid", rowGap: 8 }}>
            <label htmlFor="club-desc" style={{ color: "black", fontSize: 20, fontWeight: 400 }}>
              Description
            </label>
            <div className="search-input-wrap" style={{ border: "1.5px #EEEEEE solid", borderRadius: 10, minHeight: 120, padding: "8px 10px" }}>
              <textarea
                id="club-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter club description"
                rows={6}
                style={{ width: "100%", border: "none", outline: "none", resize: "vertical", fontWeight: 700, fontSize: 17, color: "#2A2A2A", background: "transparent" }}
              />
            </div>
          </div>
        </div>

        <div className="hr" style={{ margin: "0 20px 12px 20px" }} />

        <div style={{ display: "flex", gap: 12, justifyContent: "space-between", padding: "0 20px 20px 20px", flexWrap: "wrap" }}>
          <button type="button" onClick={onCancel} style={{ width: 199, height: 55, borderRadius: 8, background: "#E1E1E3", color: "#6B6767", fontSize: 24, fontWeight: 700 }}>
            {cancelText}
          </button>
          <button type="submit" className="btn-primary" style={{ width: 209, height: 53, borderRadius: 8, fontSize: 24 }}>
            {confirmText}
          </button>
        </div>
      </form>
    </div>
  );
}
