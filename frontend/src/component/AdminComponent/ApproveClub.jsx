import { mainStyle, titleStyle, cardsWrapper } from "../../Style/AdminApprovalStyle.jsx";
import { useEffect, useState } from "react";
import ClubCard from "../StudentComponent/ClubCard.jsx"; // 🔁 use shared card
import API_BASE_URL from "../../config/api";

function resolveImageSrc(image) {
  if (!image) return null;

  // already absolute
  if (/^https?:\/\//i.test(image)) return image;

  // make sure it has a leading slash
  let path = image.replace(/\\/g, "/");
  if (!path.startsWith("/")) path = `/${path}`;

  return `${API_BASE_URL}${path}`;
}

export default function ApproveClub() {
  const [clubs, setClubs] = useState([]);

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
      <h1 style={titleStyle}>Waiting For Approval</h1>
      <h1 style={titleStyle}></h1>

      <div style={cardsWrapper}>
        {clubs.map((club) => {
          const imageUrl = resolveImageSrc(club.image);

          return (
            <ClubCard
              key={club._id}
              club={{ ...club, imageUrl }}
              variant="admin"
              onAdminDecision={(status) => handleApproveClub(club._id, status)}
            />
          );
        })}
      </div>
    </main>
  );
}
