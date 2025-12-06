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
  // which action is being confirmed: 'approve' | 'deny' | null
  const [confirmAction, setConfirmAction] = useState(null);

  const handleApproveClick = () => setConfirmAction('approve');
  const handleDenyClick = () => setConfirmAction('deny');

  const handleConfirmApprove = async () => {
    await onApprove("approved");
    setConfirmAction(null);
    onClose();
  };

  const handleConfirmDeny = async () => {
    await onApprove("denied");
    setConfirmAction(null);
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
        <div style={denyBtnWrapper} onClick={handleDenyClick}>
          <div style={denyBtnBg} />
          <div style={denyBtnText}>Deny Club</div>
        </div>

        {/* Approve button */}
        <div style={approveBtnWrapper} onClick={handleApproveClick}>
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

      {/* Confirmation popup: render only the requested action */}
      {confirmAction === 'approve' && (
        <ConfirmApproveClub
          onCancel={() => setConfirmAction(null)}
          onConfirm={handleConfirmApprove}
        />
      )}

      {confirmAction === 'deny' && (
        <ConfirmDenyClub
          onCancel={() => setConfirmAction(null)}
          onConfirm={handleConfirmDeny}
        />
      )}
    </div>
  );
};