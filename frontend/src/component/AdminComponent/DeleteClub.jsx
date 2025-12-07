// src/components/.../DeleteClub.jsx
import { useState, useEffect } from "react";
import { ConfirmDeleteClub } from "../ConfimButton.jsx";

export default function DeleteClub() {
  const [clubs, setClubs] = useState([]);
  const [clubToDelete, setClubToDelete] = useState(null); // { _id, name } or null

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/clubs");
        const result = await response.json();
        setClubs(result.data || []);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const handleDeleteClub = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5050/api/admins/deleteClub/" + id,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}\n${errorText}`);
      }

      setClubs((prevClubs) => prevClubs.filter((club) => club._id !== id));
      setClubToDelete(null); // close modal
    } catch (err) {
      console.error("Error deleting club:", err.message);
    }
  };

  return (
    <main
      style={{
        // let it stretch inside your layout, just keep some padding from edges
        margin: "40px 0",
        padding: "0 24px 40px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        color: "#111827",
      }}
    >
      {/* Page header */}
      <header style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: 0,
            marginBottom: 4,
          }}
        >
          Delete Clubs
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#6B7280",
          }}
        >
          Carefully remove clubs from the system. This action is permanent.
        </p>
      </header>

      {/* Long horizontal cards */}
      <section
        aria-label="Existing clubs"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {clubs.map((club) => (
          <article
            key={club._id}
            style={{
              position: "relative",
              background: "#FFFFFF",
              borderRadius: 22,
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 48,
              width: 1150,              // stretch across available space
              transition: "transform 0.16s ease, box-shadow 0.16s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 24px rgba(15, 23, 42, 0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(15, 23, 42, 0.06)";
            }}
          >
            {/* Left: club name (and could add tags later if you want) */}
            <div
              style={{
                minWidth: 0, // allow ellipsis
                marginRight: 16,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={club.name}
              >
                {club.name}
              </h2>
            </div>

            {/* Right: delete button */}
            <div
              style={{
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setClubToDelete({ _id: club._id, name: club.name })
                }
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid #FCA5A5",
                  background: "#FEF2F2",
                  color: "#B91C1C",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition:
                    "background-color 0.12s ease, border-color 0.12s ease",
                }}
              >
                <span>Delete club</span>
              </button>
            </div>
          </article>
        ))}

        {clubs.length === 0 && (
          <p
            style={{
              fontSize: 14,
              color: "#9CA3AF",
            }}
          >
            No clubs found.
          </p>
        )}
      </section>

      {/* Minimal confirmation popup */}
      {clubToDelete && (
        <ConfirmDeleteClub
          clubName={clubToDelete.name}
          onConfirm={() => handleDeleteClub(clubToDelete._id)}
          onCancel={() => setClubToDelete(null)}
        />
      )}
    </main>
  );
}
