// src/component/ClubOwnerComponent/MembersModalContent.jsx
import React from "react";

/**
 * Members list modal content, used inside <PopUpModals>.
 * VISUALS:
 * - Matches the green header + bordered rows from the design version
 * Behavior:
 * - Shows members
 * - Single "Remove" confirm flow per member (confirmKickId)
 */
export default function MembersModalContent({
  members,
  confirmKickId,
  onKickClick,
  onCancelKick,
  onConfirmKick,
  onClose, // 👈 important
}) {
  return (
    <div
      style={{
        width: "min(92vw, 500px)",
        maxHeight: "min(92vh, 600px)",
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header strip */}
      <div
        style={{
          background: "#00550A",
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "white",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          Members
        </h2>
      </div>

      {/* Body */}
      <div
        style={{
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {members.length === 0 ? (
          <p style={{ fontSize: 13, color: "#4B5563" }}>
            No members in this club yet.
          </p>
        ) : (
          members.map((member) => {
            const isConfirming = confirmKickId === member.id;

            const dangerTextButton = {
              border: "none",
              background: "transparent",
              padding: 0,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              color: "#B91C1C",
            };

            const subtleTextButton = {
              border: "none",
              background: "transparent",
              padding: 0,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              color: "#4B5563",
            };

            return (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid #E5E7EB",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "#111827",
                    wordBreak: "break-all",
                  }}
                >
                  {member.email}
                </span>

                {!isConfirming ? (
                  <button
                    type="button"
                    onClick={() => onKickClick && onKickClick(member.id)}
                    style={{
                      ...dangerTextButton,
                      borderRadius: 999,
                      border: "1px solid #FCA5A5",
                      background: "#FEF2F2",
                      padding: "4px 10px",
                      fontSize: 12,
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                    }}
                  >
                    <button
                      type="button"
                      onClick={onCancelKick}
                      style={{
                        ...subtleTextButton,
                        borderRadius: 999,
                        border: "1px solid #D1D5DB",
                        background: "#FFFFFF",
                        padding: "4px 10px",
                        fontSize: 12,
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onConfirmKick && onConfirmKick(member.id)
                      }
                      style={{
                        ...dangerTextButton,
                        borderRadius: 999,
                        border: "1px solid #B91C1C",
                        background: "#B91C1C",
                        color: "#FFFFFF",
                        padding: "4px 10px",
                        fontSize: 12,
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer: Close button */}
      <div
        style={{
          padding: "0 18px 16px",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "auto",
        }}
      >
        <button
          type="button"
          onClick={() => onClose?.()} // 👈 safely call onClose if provided
          className="btn-primary"
          style={{
            minWidth: 120,
            height: 42,
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 600,
            padding: "0 22px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
