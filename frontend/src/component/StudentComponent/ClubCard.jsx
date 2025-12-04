import React, { useState } from "react";

const ClubCard = ({ club, onCardClick, onJoin }) => {
  const [confirmingJoin, setConfirmingJoin] = useState(false);

  const handleCardClick = () => {
    if (onCardClick) onCardClick(club);
  };

  const handleJoinClick = (e) => {
    e.stopPropagation();
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
      {/* Base content: image + name bar */}
      <div className="club-card-base">
        <div className="club-card-image">
          {club.imageUrl ? (
            <img src={club.imageUrl} alt={`${club.name} cover`} />
          ) : (
            <div className="club-card-placeholder" />
          )}
          <div className="club-card-name-bar">
            <span className="club-card-name">{club.name}</span>
          </div>
        </div>
      </div>

      {/* Hover content */}
      <div className="club-card-hover">
        <div className="club-card-hover-header">
          <span className="club-card-name">{club.name}</span>
        </div>

        <div className="club-card-description">
          {club.description}
        </div>

        <div className="club-card-actions">
          {!confirmingJoin ? (
            <button
              className="club-card-join-btn"
              onClick={handleJoinClick}
            >
              Join
            </button>
          ) : (
            <>
              <button
                className="club-card-yes-btn"
                onClick={handleYesClick}
              >
                Yeah, join!
              </button>
              <button
                className="club-card-cancel-btn"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
