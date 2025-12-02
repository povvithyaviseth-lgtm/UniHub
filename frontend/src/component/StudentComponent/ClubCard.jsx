// src/component/ClubCard.jsx
import React, { useState } from "react";

const ClubCard = ({ club, onCardClick, onJoin }) => {
  const [confirmingJoin, setConfirmingJoin] = useState(false);

  const handleCardClick = () => {
    if (onCardClick) onCardClick(club);
  };

  const handleJoinClick = (e) => {
    e.stopPropagation(); // don’t trigger card click / modal
    setConfirmingJoin(true);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setConfirmingJoin(false);
  };

  const handleYesClick = (e) => {
    e.stopPropagation();
    setConfirmingJoin(false);
    if (onJoin) onJoin(club);
  };

  return (
    <div
      className="club-card"
      onClick={handleCardClick}
      onMouseLeave={() => setConfirmingJoin(false)}
    >
      {/* Top image */}
      <div className="club-card-image">
        {club.imageUrl ? (
          <img src={club.imageUrl} alt={`${club.name} cover`} />
        ) : (
          <div className="club-card-placeholder" />
        )}
      </div>

      {/* Name under image */}
      <div className="club-card-body">
        <div className="club-card-name">{club.name}</div>
      </div>

      {/* Hover overlay */}
      <div className="club-card-hover">
        <div className="club-card-description">{club.description}</div>

        {!confirmingJoin ? (
          <button
            className="club-card-join-btn"
            onClick={handleJoinClick}
          >
            Join
          </button>
        ) : (
          <div className="club-card-confirm-row">
            <button
              className="club-card-yes-btn"
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="club-card-cancel-btn"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
