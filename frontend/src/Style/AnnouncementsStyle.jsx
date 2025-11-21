// Container
export const containerStyle = {
  background: "#f6f6f6",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
};

// Sidebar (Frame2)
export const sidebarStyle = {
  position: "absolute",
  background: "white",
  bottom: "0",
  left: "0",
  top: "0",
  width: "290px",
  overflow: "clip",
};

// Sidebar Inner (Frame3)
export const sidebarInnerStyle = {
  position: "absolute",
  height: "977px",
  left: "13px",
  overflow: "clip",
  top: "23px",
  width: "265px",
};

// Welcome Title
export const welcomeTitleStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "44px",
  lineHeight: "normal",
  left: "145.5px",
  fontStyle: "normal",
  fontSize: "36px",
  color: "black",
  textAlign: "center",
  top: "23px",
  transform: "translate(-50%, 0)",
  width: "269px",
};

// Sidebar Subtitle
export const sidebarSubtitleStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  lineHeight: "normal",
  left: "48px",
  fontStyle: "normal",
  right: "48px",
  color: "#707070",
  fontSize: "20px",
  whiteSpace: "pre",
  top: "49px",
};

// Navigation Label
export const navigationLabelStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  lineHeight: "normal",
  left: "10px",
  fontStyle: "normal",
  color: "#707070",
  fontSize: "20px",
  whiteSpace: "pre",
  top: "118px",
};

// Events Label
export const eventsLabelStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  lineHeight: "normal",
  left: "10px",
  fontStyle: "normal",
  color: "#707070",
  fontSize: "20px",
  whiteSpace: "pre",
  top: "243px",
};

// Nav Button Container
export const navButtonContainerStyle = (top) => ({
  position: "absolute",
  height: "41px",
  left: "10px",
  right: "11px",
  top: top,
});

// Nav Button Background
export const navButtonBgStyle = (isActive) => ({
  position: "absolute",
  background: isActive ? "#00550a" : "rgba(0,85,10,0.56)",
  height: "41px",
  left: "0",
  borderRadius: "5.432px",
  top: "0",
  width: "244px",
});

// Nav Button Text
export const navButtonTextStyle = (left) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "41px",
  justifyContent: "center",
  lineHeight: "0",
  left: left,
  fontStyle: "normal",
  fontSize: "17.414px",
  color: "white",
  top: "20.5px",
  transform: "translateY(-50%)",
  width: "230px",
});

// Back to Website
export const backToWebsiteStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  height: "47px",
  justifyContent: "center",
  lineHeight: "0",
  left: "49px",
  fontStyle: "normal",
  right: "50px",
  color: "#707070",
  fontSize: "18px",
  textAlign: "center",
  top: "398.5px",
  transform: "translateY(-50%)",
};

// Divider Container
export const dividerContainerStyle = (top) => ({
  position: "absolute",
  display: "flex",
  height: "2px",
  alignItems: "center",
  justifyContent: "center",
  left: "23px",
  top: top,
  width: "251px",
});

// Divider Line
export const dividerLineStyle = {
  background: "#b7b7b7",
  height: "2px",
  width: "251px",
  transform: "scaleY(-1)",
};

// Main Title
export const mainTitleStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "44px",
  lineHeight: "normal",
  left: "333px",
  fontStyle: "normal",
  fontSize: "48px",
  color: "black",
  top: "28px",
  width: "920px",
};

// Page Title
export const pageTitleStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "44px",
  lineHeight: "normal",
  left: "333px",
  fontStyle: "normal",
  color: "#707070",
  fontSize: "40px",
  top: "116px",
  width: "785px",
};

// Create Button Container
export const createButtonContainerStyle = {
  position: "absolute",
  height: "41px",
  right: "78px",
  top: "84px",
  width: "244px",
};

// Create Button Background
export const createButtonBgStyle = {
  position: "absolute",
  background: "#00550a",
  height: "41px",
  left: "0",
  borderRadius: "5.432px",
  top: "0",
  width: "244px",
};

// Create Button Text
export const createButtonTextStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "41px",
  justifyContent: "center",
  lineHeight: "0",
  left: "122px",
  fontStyle: "normal",
  fontSize: "17.414px",
  textAlign: "center",
  color: "white",
  top: "20.5px",
  transform: "translate(-50%, -50%)",
  width: "244px",
};

// Content Container
export const contentContainerStyle = {
  position: "absolute",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  height: "840px",
  alignItems: "flex-start",
  left: "303px",
  overflow: "clip",
  padding: "30px",
  right: "48px",
  top: "160px",
};

// Announcement Card Wrapper
export const announcementCardWrapperStyle = {
  background: "#00550a",
  height: "206px",
  overflow: "clip",
  position: "relative",
  borderRadius: "15.788px",
  boxShadow: "0px 21.491px 29.602px 0px rgba(0,0,0,0.17)",
  flexShrink: 0,
  width: "1029px",
};

// Announcement Card Inner
export const announcementCardInnerStyle = {
  position: "absolute",
  background: "white",
  height: "206px",
  left: "11px",
  overflow: "clip",
  right: "0",
  borderRadius: "15.788px",
  boxShadow: "0px 21.491px 29.602px 0px rgba(0,0,0,0.17)",
  top: "0",
};

// Announcement Content Container
export const announcementContentStyle = {
  position: "absolute",
  height: "174px",
  left: "19px",
  overflow: "clip",
  right: "19px",
  top: "16px",
};

// Announcement Title
export const announcementTitleStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  lineHeight: "normal",
  left: "0",
  fontStyle: "normal",
  fontSize: "32px",
  color: "black",
  top: "0",
  width: "980px",
};

// Announcement Club Name
export const announcementClubNameStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "18px",
  lineHeight: "normal",
  left: "0",
  fontStyle: "normal",
  color: "#00550a",
  fontSize: "15.801px",
  top: "39px",
  width: "980px",
};

// Announcement Description
export const announcementDescriptionStyle = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  height: "70px",
  lineHeight: "normal",
  left: "0",
  fontStyle: "normal",
  fontSize: "16px",
  color: "black",
  top: "72px",
  width: "980px",
};

// Edit Button Container
export const editButtonContainerStyle = {
  position: "absolute",
  bottom: "7.33px",
  height: "49.672px",
  right: "0.35px",
  width: "216.653px",
};

// Edit Button Background
export const editButtonBgStyle = {
  position: "absolute",
  background: "#00550a",
  height: "42.274px",
  left: "0",
  borderRadius: "8.455px",
  top: "4.23px",
  width: "216.653px",
};

// Edit Button Text
export const editButtonTextStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "42.274px",
  justifyContent: "center",
  lineHeight: "0",
  left: "107.27px",
  fontStyle: "normal",
  fontSize: "21.137px",
  textAlign: "center",
  color: "white",
  top: "25.36px",
  transform: "translate(-50%, -50%)",
  width: "214.539px",
};

// Button Base Style
export const buttonStyle = {
  cursor: "pointer",
  border: "none",
  background: "transparent",
};
