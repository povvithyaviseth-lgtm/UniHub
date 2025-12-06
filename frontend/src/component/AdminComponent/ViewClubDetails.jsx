import React from "react";
import {
  overlayStyle,
  popupStyle,
  bannerWrapper,
  bannerImage,
  clubInfoWrapper,
  clubTitle,
  clubDescription,
  denyBtnWrapper,
  denyBtnBg,
  denyBtnText,
  approveBtnWrapper,
  approveBtnBg,
  approveBtnText,
  closeBtnWrapper,
  closeBtnBg,
  closeBtnText,
  extraInfoWrapper,
  divider,
  leaderTextBold,
  leaderTextNormal,
  contactTextBold,
  contactTextLink,
} from "../../style/AdminClubApproveStyle";
import { useState } from "react";
import { ConfirmApproveClub, ConfirmDenyClub } from "../ConfimButton.jsx";

export const ViewClubDetails = ({ name, img, description, tag, onClose, status, onApprove }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleApproveClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmApprove = async () => {
    await onApprove("approved");
    setShowConfirm(false);
    onClose();
  };

  const handleConfirmDeny = async () => {
    await onApprove("denied");
    setShowConfirm(false);
    onClose();
  };



  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        {/* Banner image */}
        <div style={bannerWrapper}>
          <img
            style={bannerImage}
            src={img || "https://placehold.co/728x273"}
            alt={name}
          />
        </div>

        {/* Club info */}
        <div style={clubInfoWrapper}>
          <div style={clubTitle}>{name}</div>
          <div style={clubDescription}>{description}</div>
        </div>

        {/* Deny button */}
        <div style={denyBtnWrapper} onClick={() => setShowConfirm(true)}>
          <div style={denyBtnBg} />
          <div style={denyBtnText}>Deny Club</div>
        </div>

        {/* Approve button */}
        <div style={approveBtnWrapper} onClick={() => setShowConfirm(true)}>
          <div style={approveBtnBg} />
          <div style={approveBtnText}>Approve Club</div>
        </div>

        {/* Close button */}
        <div style={closeBtnWrapper} onClick={onClose}>
          <div style={closeBtnBg} />
          <div style={closeBtnText}>Close</div>
        </div>

        {/* Extra info */}
        <div style={extraInfoWrapper}>
          <div style={divider} />
          <div style={{ alignSelf: "stretch", height: 46 }}>
            <span style={leaderTextBold}>Club Leader: </span>
            <span style={leaderTextNormal}>Evelyn Reeds</span>
          </div>
          <div style={{ alignSelf: "stretch" }}>
            <span style={contactTextBold}>Contact: </span>
            <span style={contactTextLink}>EvelynReed@csus.edus</span>
          </div>
        </div>
      </div>

      {/* Confirmation popup */}
      {showConfirm && (
        <ConfirmApproveClub
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmApprove}
        />
      )}
      
      {showConfirm && (
        <ConfirmDenyClub
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleConfirmDeny}
        />
      )} 
    </div>
  );
};