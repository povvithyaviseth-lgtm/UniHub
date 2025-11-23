// AdminConsole.jsx
import React from "react";
import {
  containerStyle,
  sidebarStyle,
  welcomeStyle,
  menuTitleStyle,
  menuSubtitleStyle,
  approveBtn,
  deleteBtn,
  manageBtn,
  signoutBtn,
  mainStyle,
  titleStyle,
  subtitleStyle,
  cardsWrapper,
  cardStyle,
  cardImage,
  cardTitle,
  labelStyle,
  categoryStyle,
  cardText,
  viewBtn,
} from "../../style/AdminDashboardStyle";

const AdminDashboard = () => {
  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h1 style={welcomeStyle}>Welcome</h1>
        <p style={menuTitleStyle}>Manage your club</p>

        <div>
          <p style={menuSubtitleStyle}>Club Approval</p>
          <button style={approveBtn}>Approve Clubs</button>
          <button style={deleteBtn}>Delete Clubs</button>
        </div>

        <div>
          <p style={menuSubtitleStyle}>Account Management</p>
          <button style={manageBtn}>Manage Accounts</button>
        </div>

        <div>
          <p style={menuSubtitleStyle}>Events</p>
        </div>

        <button style={signoutBtn}>Sign Out</button>
      </aside>

      {/* Main Content */}
      <main style={mainStyle}>
        <h1 style={titleStyle}>Admin Console</h1>
        <h2 style={subtitleStyle}>Waiting For Approval</h2>

        <div style={cardsWrapper}>
          {/* Robotics Club */}
          <div style={cardStyle}>
            <img src="https://placehold.co/598x224" alt="Robotics Club" style={cardImage} />
            <h3 style={cardTitle}>The Robotics Teams</h3>
            <p>
              <span style={labelStyle}>Category:</span>{" "}
              <span style={categoryStyle}>Tech</span>
            </p>
            <p style={cardText}>
              Do you enjoy robots? Do you enjoy coding? Or do you just enjoy tech? Well, then our club is just for you!...
            </p>
            <button style={viewBtn}>View Details</button>
          </div>

          {/* Esports Club */}
          <div style={cardStyle}>
            <img src="https://placehold.co/584x195" alt="Esports Club" style={cardImage} />
            <h3 style={cardTitle}>Esports Club</h3>
            <p>
              <span style={labelStyle}>Category:</span>{" "}
              <span style={categoryStyle}>Gaming</span>
            </p>
            <p style={cardText}>
              Do you like the picture? I tried getting to Celestial Rank but peaked at Grand Master 2 then rage quit...
            </p>
            <button style={viewBtn}>View Details</button>
          </div>

          {/* Basketball Club */}
          <div style={cardStyle}>
            <img src="https://placehold.co/271x152" alt="Basketball Club" style={cardImage} />
            <h3 style={cardTitle}>Basketball Club</h3>
            <p>
              <span style={labelStyle}>Category:</span>{" "}
              <span style={categoryStyle}>Sports</span>
            </p>
            <p style={cardText}>
              Come join the greatest club to ever exist, the Basketball club. This is where all the greatest people hangout...
            </p>
            <button style={viewBtn}>View Details</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;