import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClubCard from "../component/ClubCard.jsx";

const ClubManagement = () => {
  const navigate = useNavigate();

  // Create button (kept from earlier UI)
  const [creating, setCreating] = useState(false);

  // Loaded clubs for the currently signed-in student
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder: wire to your real auth/user context
  const getCurrentStudentId = () => {
    // e.g., return auth.user.id or from context
    return "CURRENT_STUDENT_ID";
  };

  // Fetch the clubs this student belongs to
  useEffect(() => {
    const fetchClubsForStudent = async (studentId) => {
      setLoading(true);
      try {
        // TODO: Replace with your real API call, e.g.:
        // const res = await fetch(`/api/students/${studentId}/clubs`);
        // const data = await res.json();
        // setClubs(data);

        // Stub for now: simulate network + empty/no clubs result
        await new Promise((r) => setTimeout(r, 500));
        setClubs([]); // set to [] when no clubs; or an array of club objects when present
      } catch (err) {
        console.error("Failed to load clubs", err);
        // Intentionally not showing an error UI to keep the page blank if nothing shows
        setClubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClubsForStudent(getCurrentStudentId());
  }, []);

  // Optional: keep a create flow (admin/adviser). You can remove if not needed.
  const handleCreateClub = async (e) => {
    e?.preventDefault();
    setCreating(true);
    try {
      // TODO: POST to your backend to create a new club
      await new Promise((resolve) => setTimeout(resolve, 600));
      alert("Club created (stub). Replace with real API.");
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

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
            Manage your club
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

      {/* Create New Club button */}
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
          onClick={handleCreateClub}
          disabled={creating}
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
            cursor: creating ? "not-allowed" : "pointer",
            opacity: creating ? 0.7 : 1,
          }}
        >
          {creating ? "Creating…" : "Create New Club"}
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
        {/* If loading or no clubs, render nothing to keep it blank as requested */}
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
    </div>
  );
};

export default ClubManagement;
