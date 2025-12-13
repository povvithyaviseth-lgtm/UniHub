// frontend/src/component/ClubOwnerComponent/ClubsGrid.jsx

import React from "react";
import ClubCard from "../StudentComponent/ClubCard.jsx";

/**
 * Presentational grid for showing the owner's clubs.
 *
 * Props:
 * - loading         (boolean): whether clubs are still loading
 * - clubs           (array): list of club objects from the backend
 * - onCardClick     (function): called when a card is clicked (receives club)
 * - resolveImageSrc (function, optional): maps club.image -> usable image URL
 *
 * This component:
 *  - Renders the "Loading your clubs..." state
 *  - Renders the "You don’t manage any clubs yet..." empty state
 *  - Renders a responsive grid of <ClubCard /> components
 *
 * It does *not* do any fetching or navigation logic by itself.
 * The parent decides what happens when a card is clicked.
 */
export default function ClubsGrid({
  loading,
  clubs,
  onCardClick,
  resolveImageSrc,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
        padding: 20,
      }}
    >
      {/* Loading state */}
      {loading && (
        <div style={{ fontSize: 18, color: "#707070" }}>
          Loading your clubs...
        </div>
      )}

      {/* Empty state */}
      {!loading && clubs.length === 0 && (
        <div style={{ fontSize: 18, color: "#707070" }}>
          You don’t manage any clubs yet. Click “Create New Club” to
          start one!
        </div>
      )}

      {/* Cards */}
      {!loading &&
        clubs.map((club) => {
          // Compute imageUrl in a flexible way:
          // - If parent passed resolveImageSrc, use it on club.image
          // - Otherwise fall back to club.imageUrl (if parent already computed it)
          const imageUrl = resolveImageSrc
            ? resolveImageSrc(club.image)
            : club.imageUrl;

          return (
            <ClubCard
              key={club._id}
              club={{
                ...club,
                imageUrl,
              }}
              onCardClick={() => onCardClick && onCardClick(club)}
            />
          );
        })}
    </div>
  );
}
