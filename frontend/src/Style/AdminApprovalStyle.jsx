// src/style/AdminApprovalStyle.jsx

// Layout wrapper for AdminDashboard
export const containerStyle = {
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  alignItems: "stretch",
  background: "#F6F6F6",
};

// Sidebar styling
export const sidebarStyle = {
  width: 260,
  background: "#FFFFFF",
  borderRight: "1px solid #E5E7EB",
  boxSizing: "border-box",
};

// "Welcome" text in sidebar
export const welcomeStyle = {
  fontSize: 28,
  fontWeight: 700,
  margin: 0,
  textAlign: "center", // ✅ center text horizontally
  width: "100%",       // make sure it can actually center
};

// Optional menu title / subtitle styles (if you use them)
export const menuTitleStyle = {
  fontSize: 16,
  fontWeight: 600,
  margin: 0,
};

export const menuSubtitleStyle = {
  fontSize: 13,
  color: "#6B7280",
  margin: 0,
};

// Main content area used by ApproveClub / etc.
export const mainStyle = {
  flex: 1,
  padding: "40px 24px",
  overflowY: "auto",
  boxSizing: "border-box",
};

// Heading style for main pages (e.g., "Waiting For Approval")
export const titleStyle = {
  fontSize: 32,
  fontWeight: 700,
  margin: 0,
  marginBottom: 24,
};

// Wrapper for club cards grid on the approve screen
export const cardsWrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  alignItems: "flex-start",
};
