// src/pages/Admin/AdminDashboard.jsx (AdminConsole.jsx)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  containerStyle,
  sidebarStyle,
  welcomeStyle,
} from "../../Style/AdminApprovalStyle.jsx";

import {
  activeBtn,
  unActiveBtn,
  signoutBtn,
} from "../../Style/ButtonStyle.jsx";

import ApproveClub from "../../component/AdminComponent/ApproveClub.jsx";
import DeleteClub from "../../component/AdminComponent/DeleteClub.jsx";
import ManageAccount from "../../component/AdminComponent/ManageAccount.jsx";

// make sure global fonts / base styles from index.css are applied
import "../../index.css";

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
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          ...sidebarStyle,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
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
            flexGrow: 1,
          }}
        >
          <button
            type="button"
            style={activationStatus === "Approval" ? activeBtn : unActiveBtn}
            onClick={() => setActivationStatus("Approval")}
          >
            Approve Clubs
          </button>

          <button
            type="button"
            style={activationStatus === "Delete" ? activeBtn : unActiveBtn}
            onClick={() => setActivationStatus("Delete")}
          >
            Delete Clubs
          </button>

          <button
            type="button"
            style={
              activationStatus === "ManageAccount" ? activeBtn : unActiveBtn
            }
            onClick={() => setActivationStatus("ManageAccount")}
          >
            Manage Accounts
          </button>
        </nav>

        {/* Sign out at bottom */}
        <button type="button" style={signoutBtn} onClick={handleSignOut}>
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
