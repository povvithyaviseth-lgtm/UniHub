// src/component/ConfirmDialog.jsx
import React from "react";

/**
 * ConfirmDialog
 * - Title + message are vertically & horizontally centered as a group.
 * - Buttons stay at the bottom; they wrap on small widths.
 * - Fills PopUpModals' content area.
 */
export default function ConfirmDialog({
  title = "Are you sure?",
  message = "",
  warnIconSrc = null,
  cancelText = "Cancel",
  confirmText = "Yes, I’m Sure",
  onCancel,
  onConfirm,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        borderRadius: 17,
        boxShadow: "0 10px 30px rgba(0,0,0,.06)",
        display: "flex",
        flexDirection: "column",
        padding: 16,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      {/* Centered content block (fills available space and centers its children) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 12,
            maxWidth: "min(90%, 48ch)",
          }}
        >
          {/* Icon (optional) */}
          {warnIconSrc && (
            <img
              src={warnIconSrc}
              alt=""
              draggable={false}
              style={{
                width: "clamp(40px, 10vw, 68px)",
                height: "clamp(40px, 10vw, 68px)",
                objectFit: "contain",
              }}
            />
          )}

          {/* Title */}
          <div
            id="confirm-title"
            style={{
              color: "black",
              fontWeight: 700,
              fontSize: "clamp(18px, 3.2vw, 36px)",
              lineHeight: 1.2,
              padding: "0 4px",
            }}
          >
            {title}
          </div>

          {/* Message */}
          <div
            style={{
              color: "black",
              fontWeight: 400,
              fontSize: "clamp(16px, 2.4vw, 32px)",
              lineHeight: 1.35,
              padding: "0 4px",
              wordBreak: "break-word",
            }}
          >
            {message}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hr" style={{ margin: "12px 0" }} />

      {/* Buttons row (bottom) */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            minWidth: 160,
            height: 52,
            borderRadius: 8,
            background: "#E1E1E3",
            color: "#6B6767",
            fontSize: "clamp(14px, 2.2vw, 20px)",
            padding: "0 16px",
          }}
        >
          {cancelText}
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={onConfirm}
          style={{
            minWidth: 180,
            height: 52,
            borderRadius: 8,
            fontSize: "clamp(14px, 2.2vw, 20px)",
            padding: "0 16px",
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
