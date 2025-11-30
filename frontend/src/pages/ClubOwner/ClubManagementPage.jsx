// src/pages/ClubManagement.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ added
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";

/**
 * ClubManagement (responsive)
 * - Uses ONLY your index.css for hover/active (e.g., .btn-primary).
 * - Placeholder club shown; DB-wire later.
 */
export default function ClubManagement() {
  const navigate = useNavigate(); // ⬅️ added

  // Placeholder club — swap to DB data later
  const club = {
    id: "esports",
    name: "Esports Club",
    category: "Gaming",
    description:
      "Do you like the picture? I tried getting to Celestial Rank but peaked at Grand Master 2 then rage quit. I wish Emma Frost wasn’t banned a lot—I love canceling Strange ult.",
    imageUrl: "https://placehold.co/716x239",
  };

  const [showCreate, setShowCreate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

   // Create handler (talks to backend)
  const handleCreate = async (payload) => {
    console.log("CREATE club payload:", payload);
    setError("");
    setSuccess("");

    const { name, tag, description, imageFile, draft } = payload;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a club.");
      return;
    }

    try {
      // For now, fake an image path based on slug.
      // Later: actually upload `imageFile` to your backend or Cloudinary.
      const imagePath = imageFile ? `/images/clubs/${draft.slug}.png` : "";

      const res = await fetch("http://localhost:5050/api/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          tag,
          description,
          image: imagePath,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create club");
      }

      setSuccess("Club created successfully!");
      setShowCreate(false);

      console.log("New club from backend:", data.club);
      // later: refresh club list or push into state/store here
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Edit handler
  const handleEdit = (payload) => {
    console.log("EDIT club payload for", club.id, ":", payload);
    setShowEdit(false);
  };

  return (
    <div
      /* Page shell */
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F6F6F6",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        /* Responsive wrapper: sidebar + main, stacks on small screens via flex-wrap */
        style={{
          width: "100%",
          maxWidth: 1440,
          padding: 16,
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {/* ================= Sidebar ================= */}
        <aside
          aria-label="Sidebar navigation"
          style={{
            flex: "0 1 280px",
            minWidth: 260,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 1px 0 rgba(0,0,0,.04)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 16 }}>
            {/* “Welcome” title */}
            <div
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 36,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Welcome
            </div>

            {/* Kicker */}
            <div
              style={{
                color: "#707070",
                fontSize: 20,
                fontWeight: 400,
                marginTop: 8,
                marginBottom: 20,
                paddingLeft: 8,
              }}
            >
              Manage your club
            </div>

            {/* Section: Navigation */}
            <div
              style={{
                color: "#707070",
                fontSize: 20,
                fontWeight: 700,
                paddingLeft: 8,
                marginBottom: 8,
              }}
            >
              Navigation
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <button
                type="button"
                className="btn-primary"
                style={{
                  width: "100%",
                  height: 41,
                  borderRadius: 6,
                  fontSize: 17,
                }}
              >
                Manage Club &nbsp; &gt;
              </button>
            </div>

            {/* Section: Events & Notifications */}
            <div
              style={{
                color: "#707070",
                fontSize: 20,
                fontWeight: 700,
                paddingLeft: 8,
                marginTop: 20,
                marginBottom: 8,
              }}
            >
              Events and Notification
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  height: 41,
                  borderRadius: 6,
                  background: "rgba(0,85,10,0.56)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                Announcements &nbsp; &gt;
              </button>

              <button
                type="button"
                style={{
                  width: "100%",
                  height: 41,
                  borderRadius: 6,
                  background: "rgba(0,85,10,0.56)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 17,
                }}
                onClick={() => navigate("/clubManageEvents")} // ⬅️ added
              >
                Events &nbsp; &gt;
              </button>
            </div>

            {/* Back link */}
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{
                display: "block",
                margin: "14px auto 0",
                textAlign: "center",
                color: "#707070",
                fontSize: 18,
                background: "transparent",
                borderRadius: 6,
                padding: "10px 12px",
              }}
            >
              &lt; Back to Website
            </button>
          </div>
        </aside>

        {/* ================= Main ================= */}
        <section
          style={{
            flex: "1 1 600px",
            minWidth: 320,
            borderRadius: 12,
          }}
          aria-label="Main content"
        >
          {/* Header row: title + Create button */}
          <header
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "8px 8px 0",
            }}
          >
            <div>
              <div
                style={{
                  color: "black",
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                Club Management Console
              </div>
              <div
                style={{
                  color: "#707070",
                  fontSize: 32,
                  fontWeight: 700,
                  marginTop: 6,
                }}
              >
                Clubs You Manage
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn-primary"
                style={{
                  width: "100%",
                  minWidth: 220,
                  height: 41,
                  borderRadius: 6,
                  fontSize: 17,
                }}
                onClick={() => setShowCreate(true)}
              >
                Create New Club
              </button>
            </div>
          </header>

          {/* Single placeholder card (Esports) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
              padding: 20,
            }}
          >
            <article
              key={club.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0px 21.49px 29.6px rgba(0,0,0,0.17)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              aria-label={`${club.name} card`}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  margin: 20,
                  marginBottom: 12,
                  borderRadius: 15,
                  overflow: "hidden",
                  background: "#AEFFD2",
                  aspectRatio: "16 / 10",
                }}
              >
                {club.imageUrl && (
                  <img
                    src={club.imageUrl}
                    alt={`${club.name} cover`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                )}
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "0 20px 12px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    color: "#000",
                    fontSize: 32,
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  {club.name}
                </div>

                <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <div style={{ color: "#707070", fontSize: 16 }}>Category:</div>
                  <div style={{ color: "#00550A", fontSize: 16, fontWeight: 700 }}>
                    {club.category}
                  </div>
                </div>

                <div style={{ color: "#000", fontSize: 16 }}>{club.description}</div>
              </div>

              {/* Divider */}
              <div
                aria-hidden
                style={{
                  height: 2,
                  background: "#B7B7B7",
                  margin: "8px 20px 0 20px",
                }}
              />

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  padding: "12px 20px 20px 20px",
                }}
              >
                <button type="button" className="btn-primary" style={{ flex: "1 0 160px" }}>
                  View Members
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ flex: "1 0 160px" }}
                  onClick={() => setShowEdit(true)}
                >
                  Edit Club
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>

      {success && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#AEFFD2",
            padding: "16px 22px",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            color: "#00550A",
            fontSize: 18,
            fontWeight: 700,
            zIndex: 9999,
            maxWidth: "320px",
          }}
        >
          Your club has been successfully sent to admin for approval! <br />
          We will get back to you once it’s reviewed.
        </div>
        )}

      {/* ====== CREATE DIALOG ====== */}
      <PopUpModals open={showCreate} onClose={() => setShowCreate(false)}>
        <CreateClubPopUp
          title="Club Creation"
          confirmText="Create Club"
          cancelText="Cancel"
          onCancel={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      </PopUpModals>

      {/* ====== EDIT DIALOG (same component, different text) ====== */}
      <PopUpModals open={showEdit} onClose={() => setShowEdit(false)}>
        <CreateClubPopUp
          title="Edit Club"
          confirmText="Save Changes"
          cancelText="Cancel"
          onCancel={() => setShowEdit(false)}
          onCreate={handleEdit}
        />
      </PopUpModals>
    </div>
  );
}
