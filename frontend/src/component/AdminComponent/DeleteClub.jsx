import { useState, useEffect } from "react";
import {
  container,
  header,
  headerText,
  listContainer,
  row,
  clubName,
  deleteButton,
  divider,
} from "../../style/AdminDeleteStyle.jsx";
import { ConfirmDeleteClub } from "../ConfimButton.jsx";

export default function DeleteClub() {
  const [clubs, setClubs] = useState([]);
  const [clubToDelete, setClubToDelete] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/clubs");
        const result = await response.json();
        setClubs(result.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleDeleteClub = async (id) => {
    try {
      const response = await fetch("http://localhost:5050/api/clubs/delete/" + id, {
        method: "DELETE",
      });
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
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <div style={headerText}>Club Name</div>
        <div style={headerText}>Actions</div>
      </div>

      {/* Club Rows */}
      <div style={listContainer}>
        {clubs.map((club) => (
          <div key={club._id} style={row}>
            <div style={clubName}>{club.name}</div>
            <button
              style={deleteButton}
              onClick={() => setClubToDelete(club._id)}
            >
              Delete Club
            </button>
            <div style={{ ...divider, top: 0 }} />
            <div style={{ ...divider, top: 68 }} />
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {clubToDelete && (
        <ConfirmDeleteClub
          onConfirm={() => handleDeleteClub(clubToDelete)}
          onCancel={() => setClubToDelete(null)}
        />
      )}
    </div>
  );
}