// src/component/ConfirmDeleteModal.jsx
import React from "react";
import "../index.css"; // for cd-modal-shell animation & global font

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 80,
};

const cardStyle = {
  background: "#FFFFFF",
  borderRadius: 16,
  padding: "20px 22px 16px 22px",
  boxShadow: "0 24px 60px rgba(15, 23, 42, 0.25)",
  width: "min(92vw, 420px)",
  maxWidth: 420,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const titleStyle = {
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  color: "#111827",
};

const messageStyle = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.5,
  color: "#4B5563",
};

const buttonsRowStyle = {
  marginTop: 12,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
};

const cancelBtnStyle = {
  borderRadius: 999,
  border: "1px solid #D1D5DB",
  background: "#FFFFFF",
  padding: "8px 16px",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  color: "#374151",
};

const deleteBtnStyle = {
  borderRadius: 999,
  border: "none",
  background: "#B91C1C",
  padding: "8px 18px",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  color: "#FFFFFF",
};

export default function ConfirmDeleteModal({
  title = "Delete item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div style={overlayStyle}>
      {/* cd-modal-shell = smooth fade/scale animation from index.css */}
      <div className="cd-modal-shell" style={cardStyle}>
        <h2 style={titleStyle}>{title}</h2>
        <p style={messageStyle}>{message}</p>
        <div style={buttonsRowStyle}>
          <button type="button" style={cancelBtnStyle} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" style={deleteBtnStyle} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
