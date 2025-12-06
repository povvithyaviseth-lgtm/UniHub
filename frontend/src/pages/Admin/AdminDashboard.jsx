// AdminConsole.jsx
import React, { useState } from "react";
import {
  containerStyle,
  sidebarStyle,
  welcomeStyle,
  menuTitleStyle,
  menuSubtitleStyle,
} from "../../style/AdminApprovalStyle";


import { activeBtn, unActiveBtn, signoutBtn } from "../../style/ButtonStyle.jsx";
import ApproveClub from "../../component/AdminComponent/ApproveClub.jsx";
import DeleteClub from "../../component/AdminComponent/DeleteClub.jsx";

const AdminDashboard = () => {

  const [activationStatus, setActivationStatus] = useState("Approval");

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h1 style={welcomeStyle}>Welcome</h1>
        <p style={menuTitleStyle}>Manage your club</p>

        <div>
          <p style={menuSubtitleStyle}>Club Approval</p>
          <button style={activationStatus == "Approval" ? activeBtn : unActiveBtn} onClick={() => setActivationStatus("Approval")}>Approve Clubs</button>
          <button style={activationStatus == "Delete" ? activeBtn : unActiveBtn} onClick={() => setActivationStatus("Delete")}>Delete Clubs</button>
        </div>

        <div>
          <p style={menuSubtitleStyle}>Account Management</p>
          <button style={activationStatus == "ManageAccount" ? activeBtn : unActiveBtn} onClick={() => setActivationStatus("ManageAccount")}>Manage Accounts</button>
        </div>

        <button style={signoutBtn}>Sign Out</button>
      </aside>

      {/* Main Content */}
      {activationStatus == "Approval" && <ApproveClub/>}
      {activationStatus == "Delete" && <DeleteClub/>}
      
    </div>
  );
};

export default AdminDashboard;