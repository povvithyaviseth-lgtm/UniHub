// frontend/src/component/ClubOwnerComponent/ClubManagementHeader.jsx

import React from "react";

/**
 * Simple presentational header for the Club Management page.
 *
 * Props:
 * - onBack   (function): called when the "Back" button is clicked
 * - onCreate (function): called when the "Create A New Club" button is clicked
 *
 * This component is *pure UI* – it does not know about routing or state.
 * The parent decides what "back" and "create" actually do.
 */
export default function ClubManagementHeader({ onBack, onCreate }) {
  return (
    <header
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 10px 0",
      }}
    >
      {/* Left side: title */}
      <div>
        <div
          style={{
            color: "black",
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          Club Management Console
        </div>
      </div>

      {/* Right side: Back + Create buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <button
          type="button"
          className="btn-primary"
          style={{
            width: "100%",
            minWidth: 220,
            height: 41,
            fontSize: 17,
          }}
          onClick={onBack}
        >
          Back
        </button>

        <button
          type="button"
          className="btn-primary"
          style={{
            width: "100%",
            minWidth: 220,
            height: 41,
            fontSize: 17,
          }}
          onClick={onCreate}
        >
          Create A New Club
        </button>
      </div>
    </header>
  );
}
