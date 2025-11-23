// src/pages/Admin/AdminPage.jsx
import React, { useState, useCallback } from "react";
import ClubApprovalModal from "../../component/AdminComponent/ClubApprovalPopUp";

export default function AdminPage() {
  const clubs = [
    {
      id: "esports",
      name: "Esports Club",
      category: "Gaming",
      description:
        "Do you like the picture? I tried getting to Celestial Rank but peaked at Grand Master 2 then rage quit. I wish Emma Frost wasn’t banned a lot I love canceling Strange ult. Sit peasant",
      imageUrl: "https://placehold.co/584x195",
      leaderName: "Evelyn Reeds",
      contactEmail: "EvelynReed@csus.edus",
    },
  ];

  const [selected, setSelected] = useState(null);

  const openModal = useCallback((club) => setSelected(club), []);
  const closeModal = useCallback(() => setSelected(null), []);

  const approveClub = useCallback(async () => {
    if (!selected) return;
    console.log("APPROVE club ->", selected.id);
    // TODO: await api.approveClub(selected.id); refresh UI / homepage
    closeModal();
  }, [selected, closeModal]);

  const secondaryAction = useCallback(async () => {
    if (!selected) return;
    console.log("CANCEL/DENY club ->", selected.id);
    // Optional: await api.denyClub(selected.id);
    closeModal();
  }, [selected, closeModal]);

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
      <div
        style={{
          width: "100%",
          maxWidth: 1440,
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "290px 1fr",
          gap: 16,
          padding: 16,
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            background: "#fff",
            minHeight: "calc(100vh - 32px)",
            position: "sticky",
            top: 16,
            alignSelf: "start",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "24px 12px 8px",
              textAlign: "center",
              color: "#000",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            Welcome
          </div>

          <div style={{ height: 2, background: "#B7B7B7", margin: "8px 10px 12px" }} />

          <div
            style={{
              color: "#707070",
              fontSize: 20,
              fontWeight: 400,
              padding: "0 16px 10px",
              textAlign: "center",
            }}
          >
            Approve Clubs
          </div>

          <div style={{ color: "#707070", fontSize: 20, fontWeight: 700, padding: "8px 16px 6px" }}>
            Club Approval
          </div>

          <div style={{ padding: "0 10px", display: "grid", gap: 10 }}>
            <button
              type="button"
              style={{
                width: "100%",
                height: 41,
                borderRadius: 5.43,
                background: "#00550A",
                color: "#fff",
                fontWeight: 700,
                fontSize: 17.41,
                border: "none",
                cursor: "pointer",
              }}
            >
              Approve Clubs &nbsp;&gt;
            </button>

            <button
              type="button"
              style={{
                width: "100%",
                height: 41,
                borderRadius: 5.43,
                background: "rgba(0,85,10,0.56)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 17.41,
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete Clubs &nbsp;&gt;
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ minWidth: 320, display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 8,
            }}
          >
            <div style={{ color: "black", fontSize: 48, fontWeight: 700, lineHeight: 1.2 }}>
              Admin Console
            </div>

            <button
              type="button"
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 8,
                background: "#A60000",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                border: "none",
                cursor: "pointer",
                position: "relative",
                top: 2, // keeps it aligned with the heading per your tweak
              }}
              onClick={() => console.log("Sign Out")}
            >
              Sign Out
            </button>
          </div>

          <div style={{ color: "#707070", fontSize: 40, fontWeight: 700 }}>
            Waiting For Approval
          </div>

          <div
            style={{
              background: "transparent",
              padding: 14,
              display: "grid",
              gap: 10,
              gridTemplateColumns: "repeat(auto-fill, minmax(249px, 1fr))",
              alignContent: "start",
            }}
          >
            {clubs.map((club) => (
              <article
                key={club.id}
                onClick={() => openModal(club)}
                style={{
                  height: 371,
                  position: "relative",
                  background: "white",
                  boxShadow: "0px 17.53px 24.14px rgba(0, 0, 0, 0.17)",
                  overflow: "hidden",
                  borderRadius: 12.88,
                  cursor: "pointer",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: 207.63,
                    height: 131.18,
                    position: "absolute",
                    left: 20.92,
                    top: 16.9,
                    overflow: "hidden",
                    borderRadius: 12.07,
                    background: "#AEFFD2",
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
                    width: 207.63,
                    height: 144.53,
                    position: "absolute",
                    left: 20.92,
                    top: 150.49,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 3.86,
                  }}
                >
                  <div style={{ color: "black", fontSize: 25.75, fontWeight: 700 }}>
                    {club.name}
                  </div>

                  <div style={{ display: "inline-flex", gap: 3.86 }}>
                    <div style={{ color: "#707070", fontSize: 12.89 }}>Category:</div>
                    <div style={{ color: "#00550A", fontSize: 12.89, fontWeight: 700 }}>
                      {club.category}
                    </div>
                  </div>

                  <div style={{ color: "black", fontSize: 12.88 }}>{club.description}</div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: 213.26,
                    height: 1.61,
                    position: "absolute",
                    left: 15.29,
                    top: 311.45,
                    background: "#B7B7B7",
                  }}
                />

                {/* View Details */}
                <div
                  style={{
                    width: 165.12,
                    height: 37.86,
                    position: "absolute",
                    left: 39.43,
                    top: 321.1,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(club);
                  }}
                >
                  <div
                    style={{
                      width: 165.12,
                      height: 32.22,
                      position: "absolute",
                      left: 0,
                      top: 3.22,
                      background: "#00550A",
                      borderRadius: 6.44,
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      width: 163.51,
                      height: 32.22,
                      position: "absolute",
                      left: 0,
                      top: 3.22,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 16.11,
                      fontWeight: 700,
                      borderRadius: 6.44,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>

      {/* Reusable modal */}
      <ClubApprovalModal
        open={!!selected}
        onClose={closeModal}
        onApprove={approveClub}
        onSecondary={secondaryAction}              // remove this prop if you only want Approve + Close
        approveLabel="Approve Club"                // customize per page if you want
        secondaryLabel="Cancel"                    // change text freely
        closeLabel="Close"
        title={selected?.name}
        description={selected?.description}
        imageUrl={selected?.imageUrl}
        leaderName={selected?.leaderName}
        contactEmail={selected?.contactEmail}
      />
    </div>
  );
}
