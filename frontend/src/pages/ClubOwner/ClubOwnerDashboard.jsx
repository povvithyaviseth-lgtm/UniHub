import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ClubCard from "../../component/ClubCard.jsx";  //<--- reusable component from component

const ClubManagement = () => {
  const navigate = useNavigate();

  // Clubs for the signed-in student
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Club modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState("");

  // Form fields
  const [clubName, setClubName] = useState("");
  const [clubLocation, setClubLocation] = useState("");
  const [clubTime, setClubTime] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Placeholder: wire to your real auth/user context
  const getCurrentStudentId = () => {
    return "CURRENT_STUDENT_ID";
  };

  // Open/close modal helpers
  const openCreate = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const closeCreate = useCallback(() => {
    setIsCreateOpen(false);
    setSubmitting(false);
    // Keep fields so users don't lose progress if they clicked outside by accident
  }, []);

  // Image handling
  const onPickImage = (file) => {
    setImageFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview("");
    }
  };

  const handleCreateSubmit = async (e) => {
  e?.preventDefault();

  // Basic validation
  if (!clubName.trim()) {
    alert("Please enter a club name.");
    return;
  }

  setSubmitting(true);
  try {
    const body = {
      name: clubName.trim(),
      location: clubLocation.trim(),
      time: clubTime.trim(),
      description: clubDesc.trim(),
      ownerId: getCurrentStudentId(), // use your placeholder or auth
      imageUrl: "", // optional placeholder, backend accepts this
    };

    const res = await fetch('/api/clubs/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error('Failed to submit');
    const created = await res.json();

    // Show success and reset modal
    setIsCreateOpen(false);
    setSuccessBanner(created.message || 'Club sent to admin for approval!');

    // Clear form fields
    setClubName("");
    setClubLocation("");
    setClubTime("");
    setClubDesc("");
    setImageFile(null);
    setImagePreview("");

    // Hide banner after 4s
    setTimeout(() => setSuccessBanner(""), 4000);
  } catch (err) {
    console.error(err);
    alert("Something went wrong submitting your club. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeCreate();
      }
    };
    if (isCreateOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCreateOpen, closeCreate]);

  return (
    <div
      style={{
        width: 1440,
        height: 1024,
        position: "relative",
        background: "#F6F6F6",
        overflow: "hidden",
      }}
    >
      {/* Success Banner */}
      {successBanner && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "absolute",
            right: 24,
            top: 24,
            background: "#E8F5E9",
            color: "#1B5E20",
            border: "1px solid #C8E6C9",
            borderRadius: 10,
            padding: "10px 14px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            zIndex: 50,
          }}
        >
          {successBanner}
        </div>
      )}

      {/* Sidebar */}
      <div
        style={{
          width: 290,
          height: 1024,
          left: 0,
          top: 0,
          position: "absolute",
          background: "white",
          overflow: "hidden",
          boxShadow: "0px 2px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            width: 269,
            height: 44,
            left: 11,
            top: 23,
            position: "absolute",
            textAlign: "center",
            color: "black",
            fontSize: 36,
            fontFamily: "Inter, sans-serif",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Welcome
        </div>

        <div
          style={{
            width: 265,
            height: 977,
            left: 13,
            top: 23,
            position: "absolute",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              left: 48,
              top: 80,
              position: "absolute",
              color: "#707070",
              fontSize: 20,
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
          </div>

          <div
            style={{
              left: 10,
              top: 148,
              position: "absolute",
              color: "#707070",
              fontSize: 20,
              fontFamily: "Inter, sans-serif",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Navigation
          </div>

          {/* Manage Club */}
          <div style={{ width: 244, height: 41, left: 10, top: 186, position: "absolute" }}>
            <div
              style={{
                width: 244,
                height: 41,
                left: 0,
                top: 0,
                position: "absolute",
                background: "#00550A",
                borderRadius: 5.43,
              }}
            />
            <button
              onClick={() => {}}
              style={{
                width: 230,
                height: 41,
                left: 14,
                top: 0,
                position: "absolute",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "white",
                fontSize: 17.41,
                fontFamily: "Inter, sans-serif",
                fontWeight: "700",
                wordWrap: "break-word",
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Manage Club &nbsp;&gt;
            </button>
          </div>

          {/* Events & Notifications section label */}
          <div
            style={{
              left: 10,
              top: 243,
              position: "absolute",
              color: "#707070",
              fontSize: 20,
              fontFamily: "Inter, sans-serif",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Events and Notifications
          </div>

          {/* Announcements */}
          <div style={{ width: 244, height: 41, left: 10, top: 280, position: "absolute" }}>
            <div
              style={{
                width: 244,
                height: 41,
                left: 0,
                top: 0,
                position: "absolute",
                background: "rgba(0, 84.59, 9.87, 0.56)",
                borderRadius: 5.43,
              }}
            />
            <button
              onClick={() => {}}
              style={{
                width: 230,
                height: 41,
                left: 14,
                top: 0,
                position: "absolute",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "white",
                fontSize: 17.41,
                fontFamily: "Inter, sans-serif",
                fontWeight: "700",
                wordWrap: "break-word",
                background: "transparent",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Announcements &nbsp;&gt;
            </button>
          </div>

          {/* Events */}
          <div
            style={{
              width: 244,
              height: 41,
              left: 10,
              top: 334,
              position: "absolute",
              background: "rgba(0, 84.59, 9.87, 0.56)",
              borderRadius: 5.43,
            }}
          />
          <button
            onClick={() => {}}
            style={{
              width: 230,
              height: 41,
              left: 24,
              top: 334,
              position: "absolute",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontSize: 17.41,
              fontFamily: "Inter, sans-serif",
              fontWeight: "700",
              wordWrap: "break-word",
              background: "transparent",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Events &nbsp;&gt;
          </button>

          {/* Back to Website */}
          <button
            onClick={() => navigate("/home")}
            style={{
              width: 166,
              height: 47,
              left: 49,
              top: 390,
              position: "absolute",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "#707070",
              fontSize: 18,
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              wordWrap: "break-word",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            &lt; Back to Website
          </button>
        </div>
      </div>

      {/* Top bar and title */}
      <div
        style={{
          width: 920,
          height: 44,
          left: 333,
          top: 28,
          position: "absolute",
          color: "black",
          fontSize: 48,
          fontFamily: "Inter, sans-serif",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        Club Management Console
      </div>

      {/* Create New Club button (opens modal) */}
      <div style={{ width: 244, height: 41, left: 1118, top: 84, position: "absolute" }}>
        <div
          style={{
            width: 244,
            height: 41,
            left: 0,
            top: 0,
            position: "absolute",
            background: "#00550A",
            borderRadius: 5.43,
          }}
        />
        <button
          onClick={openCreate}
          disabled={submitting}
          style={{
            width: 244,
            height: 41,
            left: 0,
            top: 0,
            position: "absolute",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: 17.41,
            fontFamily: "Inter, sans-serif",
            fontWeight: "700",
            wordWrap: "break-word",
            background: "transparent",
            border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          Create New Club
        </button>
      </div>

      {/* Main content: render ClubCards for the signed-in student. If none, keep blank. */}
      <div
        style={{
          position: "absolute",
          left: 333,
          top: 140,
          width: 1075,
          height: 840,
          overflow: "auto",
          padding: 16,
        }}
      >
        {!loading && clubs.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {clubs.map((club) => (
              <ClubCard key={club.id} {...club} />
            ))}
          </div>
        )}
      </div>

      {/* Create Club Modal */}
      {isCreateOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-club-title"
          onClick={(e) => {
            // Close if clicking the dark overlay, not the modal content
            if (e.target === e.currentTarget) closeCreate();
          }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 40,
          }}
        >
          <div
            style={{
              width: 640,
              maxWidth: "92vw",
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              padding: 20,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div id="create-club-title" style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 12 }}>
              Create a Club
            </div>

            <form onSubmit={handleCreateSubmit} style={{ display: "grid", gap: 12 }}>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#333" }}>
                Club Name
                <input
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="e.g., Robotics Club"
                  aria-label="Club Name"
                  style={{
                    marginTop: 6,
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid #e6e6e6",
                    padding: "0 12px",
                    outline: "none",
                  }}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#333" }}>
                  Location
                  <input
                    value={clubLocation}
                    onChange={(e) => setClubLocation(e.target.value)}
                    placeholder="e.g., Room 204"
                    aria-label="Club Location"
                    style={{
                      marginTop: 6,
                      width: "100%",
                      height: 40,
                      borderRadius: 8,
                      border: "1px solid #e6e6e6",
                      padding: "0 12px",
                      outline: "none",
                    }}
                  />
                </label>

                <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#333" }}>
                  Time
                  <input
                    value={clubTime}
                    onChange={(e) => setClubTime(e.target.value)}
                    placeholder="e.g., Fridays 3:30–4:30pm"
                    aria-label="Club Time"
                    style={{
                      marginTop: 6,
                      width: "100%",
                      height: 40,
                      borderRadius: 8,
                      border: "1px solid #e6e6e6",
                      padding: "0 12px",
                      outline: "none",
                    }}
                  />
                </label>
              </div>

              <label style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#333" }}>
                Description
                <textarea
                  value={clubDesc}
                  onChange={(e) => setClubDesc(e.target.value)}
                  placeholder="What is this club about?"
                  rows={4}
                  aria-label="Club Description"
                  style={{
                    marginTop: 6,
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid #e6e6e6",
                    padding: "10px 12px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </label>

              <div style={{ display: "grid", gap: 8 }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#333" }}>Club Image</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <label
                    htmlFor="club-image-input"
                    style={{
                      background: "#00550A",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: 8,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    Choose Image
                  </label>
                  <input
                    id="club-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickImage(e.target.files?.[0] || null)}
                    style={{ display: "none" }}
                  />
                  {imageFile && (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#444" }}>
                      {imageFile.name}
                    </span>
                  )}
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Club preview"
                    style={{ width: 160, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #e6e6e6" }}
                  />
                )}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 4, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={closeCreate}
                  style={{
                    background: "white",
                    color: "#333",
                    border: "1px solid #e6e6e6",
                    borderRadius: 10,
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: "#00550A",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 16px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {submitting ? "Sending…" : "Create"}
                </button>
              </div>
            </form>

            {/* Close (X) */}
            <button
              aria-label="Close"
              onClick={closeCreate}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "1px solid #eee",
                background: "white",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;
