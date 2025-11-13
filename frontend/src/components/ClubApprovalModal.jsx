import React from "react";
import PopUpModals from "./PopUpModals";

/**
 * ApproveClubModal
 * Reusable approval modal for any club.
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - club: {
 *      name, description, imageUrl,
 *      leaderName, contactEmail
 *    }
 *  - onApprove: (club) => void
 *  - onDeny: (club) => void
 */
export default function ApproveClubModal({
  open,
  onClose,
  club,
  onApprove,
  onDeny,
}) {
  if (!open || !club) return null;

  return (
    <PopUpModals open={open} onClose={onClose}>
      {/* Natural child size: 576x763 (matches your mock) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Approve club"
        style={{
          width: 576,
          height: 763,
          position: "relative",
          background: "white",
          overflow: "hidden",
          borderRadius: 15,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div
          style={{
            width: "100%",
            height: 250,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {club.imageUrl && (
            <img
              src={club.imageUrl}
              alt={`${club.name} header`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        {/* Title + description */}
        <div
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            top: 283,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              color: "black",
              fontSize: 32,
              fontWeight: 700,
              lineHeight: "38px",
            }}
          >
            {club.name}
          </div>
          <div style={{ color: "black", fontSize: 20, lineHeight: "26px" }}>
            {club.description}
          </div>
        </div>

        {/* Divider + leader/contact */}
        <div
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            top: 513,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ height: 2, background: "#B7B7B7", width: "100%" }} />

          <div style={{ color: "black", fontSize: 20 }}>
            <span style={{ fontWeight: 700 }}>Club Leader: </span>
            <span style={{ fontWeight: 400 }}>{club.leaderName}</span>
          </div>

          <div style={{ color: "black", fontSize: 20 }}>
            <span style={{ fontWeight: 700 }}>Contact: </span>
            <a
              href={`mailto:${club.contactEmail}`}
              style={{
                color: "#0091A1",
                textDecoration: "underline",
                fontWeight: 400,
              }}
            >
              {club.contactEmail}
            </a>
          </div>
        </div>

        {/* Buttons */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            left: 35,
            top: 670,
            width: 235,
            height: 65,
            background: "#E1E1E3",
            borderRadius: 8,
            border: "none",
            color: "#6B6767",
            fontSize: 32,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Close
        </button>

        <button
          type="button"
          onClick={() => onDeny?.(club)}
          style={{
            position: "absolute",
            left: 348,
            top: 642,
            width: 198,
            height: 50.83,
            background: "#C40000",
            borderRadius: 6.07,
            border: "none",
            color: "white",
            fontSize: 18.21,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Deny Club
        </button>

        <button
          type="button"
          onClick={() => onApprove?.(club)}
          style={{
            position: "absolute",
            left: 348,
            top: 699,
            width: 198,
            height: 50.83,
            background: "#00550A",
            borderRadius: 6.07,
            border: "none",
            color: "white",
            fontSize: 18.21,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Approve Club
        </button>
      </div>
    </PopUpModals>
  );
}
