import React from "react";
import { useNavigate } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";

const API_BASE_URL = "http://localhost:5050";

/**
 * Turn whatever is stored in `club.image` into a browser-usable src.
 *
 * Expected values:
 *   - "https://..." or "http://..." → use as-is
 *   - "/images/club/slug.png"       → prefix with API_BASE_URL
 *   - "images/club/slug.png"        → add leading "/", then prefix
 */
function resolveImageSrc(image) {
  if (!image) return null;

  // 1) Already absolute URL
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  // 2) Normalize: ensure there is exactly one leading "/"
  let path = image.replace(/\\/g, "/"); // Windows safety
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  // 3) Prefix with backend host
  return `${API_BASE_URL}${path}`;
}

// Card component for each club
function ClubCard({ club, onEdit }) {
  const [hovered, setHovered] = React.useState(false);
  const isPending = club.status === "pending";

  const imageSrc = resolveImageSrc(club.image);

  return (
    <article
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 16,
        boxShadow: hovered
          ? "0 12px 26px rgba(15, 23, 42, 0.16)"
          : "0 6px 16px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        minHeight: 260,
      }}
      aria-label={`${club.name} card`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base content: image + name */}
      <div>
        <div
          style={{
            position: "relative",
            margin: 20,
            marginBottom: 12,
            borderRadius: 15,
            overflow: "hidden",
            background: "#AEFFD2",
            aspectRatio: "16 / 10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${club.name} cover`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
              onError={(e) => {
                // hide broken images so you don’t get the broken-icon
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 14,
                color: "#065F46",
                padding: 8,
                textAlign: "center",
              }}
            >
              No image uploaded
            </span>
          )}
        </div>

        <div
          style={{
            padding: "0 20px 20px 20px",
          }}
        >
          <div
            style={{
              color: "#000",
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {club.name}
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#FFFFFF",
            color: "#0F172A",
            display: "flex",
            flexDirection: "column",
            padding: 20,
            boxSizing: "border-box",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
          }}
        >
          {/* Tag + Status row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 13, color: "#6B7280" }}></div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "2px 10px",
                borderRadius: 999,
                background: "#ECFDF3",
                color: "#166534",
                maxWidth: "50%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {club.tag || "No tag"}
            </div>

            <div
              style={{
                marginLeft: "auto",
                padding: "2px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                backgroundColor: isPending ? "#F3F4F6" : "#DCFCE7",
                color: isPending ? "#4B5563" : "#166534",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {isPending ? "Pending approval" : "Approved"}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.4,
              color: "#4B5563",
              marginBottom: 16,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {club.description}
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: "auto",
            }}
          >
            <button
              type="button"
              className="btn-primary"
              disabled={isPending}
              style={{
                width: "100%",
                height: 40,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                opacity: isPending ? 0.5 : 1,
                cursor: isPending ? "not-allowed" : "pointer",
              }}
            >
              View Members
            </button>

            <button
              type="button"
              className="btn-primary"
              style={{
                width: "100%",
                height: 40,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
              }}
              onClick={onEdit}
            >
              Edit Club
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ClubManagement() {
  const navigate = useNavigate();

  const [showCreate, setShowCreate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [clubs, setClubs] = React.useState([]);
  const [loadingClubs, setLoadingClubs] = React.useState(true);
  const [editingClub, setEditingClub] = React.useState(null);

  // Fetch clubs owned by the logged-in user
  React.useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoadingClubs(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view your clubs.");
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/clubs/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch your clubs");
        }

        setClubs(data.clubs || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoadingClubs(false);
      }
    };

    fetchClubs();
  }, []);

  // Create handler (talks to backend with multer)
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
      const formData = new FormData();

      formData.append("name", name);
      formData.append("tag", tag);
      formData.append("description", description);
      formData.append("slug", draft.slug);

      if (imageFile) {
        formData.append("image", imageFile); // must match upload.single("image")
      }

      const res = await fetch(`${API_BASE_URL}/api/clubs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type when sending FormData
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create club");
      }

      setSuccess("Club created successfully!");
      setShowCreate(false);

      console.log("New club from backend:", data.club);

      setClubs((prev) => [data.club, ...prev]);

      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleEdit = async (payload) => {
    if (!editingClub) return;

    console.log("EDIT club payload:", payload);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to edit a club.");
      return;
    }

    try {
      const { name, tag, description } = payload;

      const res = await fetch(`${API_BASE_URL}/api/clubs/${editingClub._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name ?? editingClub.name,
          tag: tag ?? editingClub.tag,
          description: description ?? editingClub.description,
          // not touching `image` here; file updates should go through multer upload
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update club");
      }

      console.log("Updated club from backend:", data);

      setClubs((prev) => prev.map((c) => (c._id === data._id ? data : c)));

      setSuccess("Club updated successfully!");
      setShowEdit(false);
      setEditingClub(null);
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setTimeout(() => setError(""), 2000);
    }
  };

  /* ======================================================
     SUCCESS & ERROR BANNERS
  ====================================================== */
  const successBanner = success && (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "#ffffffff",
        padding: "16px 22px",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        color: "#00550A",
        fontSize: 18,
        fontWeight: 700,
        zIndex: 9999,
        maxWidth: "330px",
      }}
    >
      Your club has been successfully sent to admin for approval! <br />
      We will get back to you once it’s reviewed.
    </div>
  );

  const errorBanner = error && (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "#FFB3B3",
        padding: "16px 22px",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        color: "#7A0000",
        fontSize: 18,
        fontWeight: 700,
        zIndex: 9999,
        maxWidth: "330px",
      }}
    >
      {error}
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#F6F6F6",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {errorBanner}
      {successBanner}

      <div
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

            <div
              style={{
                color: "#707070",
                fontSize: 20,
                fontWeight: 400,
                marginTop: 8,
                marginBottom: 20,
                paddingLeft: 8,
              }}
            ></div>

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
                onClick={() => navigate("/clubManageEvents")}
              >
                Events &nbsp; &gt;
              </button>
            </div>

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
          <header
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "10px 10px 0",
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
              ></div>
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
                Create New A Club
              </button>
            </div>
          </header>

          {/* Clubs grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
              padding: 20,
            }}
          >
            {loadingClubs && (
              <div style={{ fontSize: 18, color: "#707070" }}>
                Loading your clubs...
              </div>
            )}

            {!loadingClubs && clubs.length === 0 && (
              <div style={{ fontSize: 18, color: "#707070" }}>
                You don’t manage any clubs yet. Click “Create A New Club” to
                start one!
              </div>
            )}

            {!loadingClubs &&
              clubs.map((club) => (
                <ClubCard
                  key={club._id}
                  club={club}
                  onEdit={() => {
                    setEditingClub(club);
                    setShowEdit(true);
                  }}
                />
              ))}
          </div>
        </section>
      </div>

      {/* ====== CREATE DIALOG ====== */}
      <PopUpModals open={showCreate} onClose={() => setShowCreate(false)}>
        <CreateClubPopUp
          title="Create Club"
          confirmText="Submit"
          cancelText="Cancel"
          onCancel={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      </PopUpModals>

      {/* ====== EDIT DIALOG ====== */}
      <PopUpModals
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setEditingClub(null);
        }}
      >
        <CreateClubPopUp
          title="Edit Club"
          confirmText="Save Changes"
          cancelText="Cancel"
          onCancel={() => {
            setShowEdit(false);
            setEditingClub(null);
          }}
          onCreate={handleEdit}
          initialName={editingClub?.name}
          initialTag={editingClub?.tag}
          initialDescription={editingClub?.description}
          initialImage={editingClub?.image}
        />
      </PopUpModals>
    </div>
  );
}
