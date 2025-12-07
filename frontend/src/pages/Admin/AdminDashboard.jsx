// AdminConsole.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  containerStyle,
  sidebarStyle,
  welcomeStyle,
  menuTitleStyle,
  menuSubtitleStyle,
} from "../../style/AdminApprovalStyle";

import {
  activeBtn,
  unActiveBtn,
  signoutBtn,
} from "../../style/ButtonStyle.jsx";

import ApproveClub from "../../component/AdminComponent/ApproveClub.jsx";
import DeleteClub from "../../component/AdminComponent/DeleteClub.jsx";
import ManageAccount from "../../component/AdminComponent/ManageAccount.jsx";

const AdminDashboard = () => {
  const [activationStatus, setActivationStatus] = useState("Approval");
  const navigate = useNavigate();

  const handleSignOut = () => {
    // add any auth cleanup here if needed
    navigate("/"); // go back to home /
  };

  return (
    <div
      style={{
        ...containerStyle,
        minHeight: "100vh", // make whole layout at least viewport height
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          ...sidebarStyle,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // ensure sidebar stretches full height
          boxSizing: "border-box",
          padding: "24px 20px",
        }}
      >
        <h1 style={welcomeStyle}>Welcome</h1>

        {/* Menu buttons */}
        <nav
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flexGrow: 1, // pushes Sign Out to bottom
          }}
        >
          <button
            style={{
              ...(activationStatus === "Approval" ? activeBtn : unActiveBtn),
              width: "100%",
              textAlign: "left",
            }}
            onClick={() => setActivationStatus("Approval")}
          >
            Approve Clubs
          </button>

          <button
            style={{
              ...(activationStatus === "Delete" ? activeBtn : unActiveBtn),
              width: "100%",
              textAlign: "left",
            }}
            onClick={() => setActivationStatus("Delete")}
          >
            Delete Clubs
          </button>

          <button
            style={{
              ...(activationStatus === "ManageAccount"
                ? activeBtn
                : unActiveBtn),
              width: "100%",
              textAlign: "left",
            }}
            onClick={() => setActivationStatus("ManageAccount")}
          >
            Manage Accounts
          </button>
        </nav>

        {/* Sign out at bottom */}
        <button
          style={{
            ...signoutBtn,
            width: "100%",
            marginTop: 16,
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      {activationStatus === "Approval" && <ApproveClub />}
      {activationStatus === "Delete" && <DeleteClub />}
      {activationStatus === "ManageAccount" && <ManageAccount />}
    </div>
  );
};

export default AdminDashboard;
