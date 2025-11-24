import React from "react";
import {
  cardStyle,
  cardImage,
  cardTitle,
  labelStyle,
  categoryStyle,
  cardText,
  viewBtn,
} from "../../style/AdminApprovalStyle";

export const ClubApprovalPopup = ({ name, img, description, tag }) => {
  return (
    <div style={cardStyle}>
      <img src={img} alt={name} style={cardImage} />
      <h3 style={cardTitle}>{name}</h3>
      <p>
        <span style={labelStyle}>Category:</span>{" "}
        <span style={categoryStyle}>{tag}</span>
      </p>
      <p style={cardText}>{description}</p>
      <button style={viewBtn}>View Details</button>
    </div>
  );
};