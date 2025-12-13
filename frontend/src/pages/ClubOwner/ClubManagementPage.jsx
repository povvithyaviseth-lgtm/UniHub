// src/pages/ClubOwner/ClubManagementPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import CreateClubPopUp from "../../component/ClubOwnerComponent/CreateClubPopUp.jsx";
import ClubManagementHeader from "../../component/ClubOwnerComponent/ClubManagementHeader.jsx";
import ClubsGrid from "../../component/ClubOwnerComponent/ClubsGrid.jsx";
import "../../index.css"; // ✅ ensure fadeInUp + fonts are available

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

export default function ClubManagement() {
  const navigate = useNavigate();

  const [showCreate, setShowCreate] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const [clubs, setClubs] = React.useState([]);
  const [loadingClubs, setLoadingClubs] = React.useState(true);
  const [editingClub, setEditingClub] = React.useState(null);

  // Handlers for header buttons
  const handleGoHome = () => {
    navigate("/home"); // matches your <Route path="/home" element={<HomePage />} />
  };

  const handleOpenCreate = () => {
    setShowCreate(true);
  };

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
  /*const handleAnnouncements = (clubId) => {
  navigate(`/console/announcements/${clubId}`);
};*/
const handleAnnouncements = () => {
  if (!clubs || clubs.length === 0) {
    alert("You don't have any clubs yet.");
    return;
  }

  const firstClub = clubs[0]; // 👈 automatically use first owned club
  navigate(`/console/announcements/${firstClub._id}`);
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

  // 🔗 Helper that navigates to a club's dashboard
  const goToClubDashboard = (clubId) => {
    if (!clubId) return;
    navigate(`/console/clubs/${clubId}`);
  };

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
          // ✅ Smooth fade-in + move up for the whole page content
          opacity: 0,
          animation: "fadeInUp 0.45s ease-out forwards",
        }}
      >
        {/* ================= Main ================= */}
        <section
          style={{
            flex: "1 1 600px",
            minWidth: 320,
            borderRadius: 12,
          }}
          aria-label="Main content"
        >
          <ClubManagementHeader
            onBack={handleGoHome}
            onCreate={handleOpenCreate}
            onAnnouncements={handleAnnouncements}
          />

          {/* Clubs grid */}
          <ClubsGrid
            loading={loadingClubs}
            clubs={clubs}
            resolveImageSrc={resolveImageSrc}
            // Clicking the card itself
            onCardClick={goToClubDashboard}
            // Clicking the card's "More" button (if ClubsGrid supports it)
            onMoreClick={goToClubDashboard}
            //onAnnouncements={handleAnnouncements}
          />
        </section>
      </div>

      {/* ====== CREATE DIALOG ====== */}
      <PopUpModals open={showCreate} onClose={() => setShowCreate(false)}>
        {/* ✅ Smooth fade-in for CREATE modal */}
        <div
          style={{
            opacity: 0,
            animation: "fadeInUp 0.38s ease-out forwards",
          }}
        >
          <CreateClubPopUp
            title="Create Club"
            confirmText="Submit"
            cancelText="Cancel"
            onCancel={() => setShowCreate(false)}
            onCreate={handleCreate}
          />
        </div>
      </PopUpModals>

      {/* ====== EDIT DIALOG ====== */}
      <PopUpModals
        open={showEdit}
        onClose={() => {
          setShowEdit(false);
          setEditingClub(null);
        }}
      >
        {/* ✅ Same smooth fade-in for EDIT modal */}
        <div
          style={{
            opacity: 0,
            animation: "fadeInUp 0.38s ease-out forwards",
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
        </div>
      </PopUpModals>
    </div>
  );
}
