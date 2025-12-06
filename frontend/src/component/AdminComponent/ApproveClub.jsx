
import { mainStyle, titleStyle, subtitleStyle, cardsWrapper } from "../../style/AdminApprovalStyle";
import { ClubPanel } from "./ClubPanel";
import { useEffect, useState } from "react";

export default function ApproveClub() {
  const [clubs, setClubs] = useState([]);

  // move fetchClubs outside so it's reusable
  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/admins/ClubRequests");
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();

    // optional auto reload every 10s
    const intervalId = setInterval(fetchClubs, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleApproveClub = async (id, status) => {
    try {
      const response = await fetch(`/api/admins/ClubRequests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}\n${errorText}`);
      }

      await response.json();

      await fetchClubs();
    } catch (err) {
      console.error("Error approving club:", err.message);
    }
  };

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Admin Console</h1>
      <h2 style={subtitleStyle}>Waiting For Approval</h2>

      <div style={cardsWrapper}>
        {clubs.map((club) => (
          <ClubPanel
            key={club._id}
            name={club.name}
            img={`http://localhost:5050${club.image}`}
            description={club.description}
            tag={club.tag}
            onApprove={(status) => handleApproveClub(club._id, status)}
          />
        ))}
      </div>
    </main>
  );
}
