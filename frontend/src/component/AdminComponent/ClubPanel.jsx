import React, { useState } from "react";
import {
  cardStyle,
  cardImage,
  cardTitle,
  labelStyle,
  categoryStyle,
  cardText,
  viewBtn,
} from "../../style/AdminApprovalStyle";
import { ViewClubDetails } from "./ViewClubDetails";

export const ClubPanel = ({ name, img, description, tag, onApprove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);

  return (
    <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
      <img src={img} alt={name} style={cardImage} />
      <h3 style={cardTitle}>{name}</h3>
      <p>
        <span style={labelStyle}>Category:</span>{" "}
        <span style={categoryStyle}>{tag}</span>
      </p>
      <p style={cardText}>{description}</p>

      {/* Button anchored at bottom */}
      <button style={{ ...viewBtn, marginTop: "auto" }} onClick={handleViewDetails}>
        View Details
      </button>

      {showDetails && (
        <ViewClubDetails
          name={name}
          img={img}
          description={description}
          tag={tag}
          onApprove={onApprove}
          onClose={handleClose}
        />
      )}
    </div>
  );
};