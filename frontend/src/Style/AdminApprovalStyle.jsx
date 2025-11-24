// AdminConsoleStyles.jsx

export const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  background: "#F6F6F6",
  fontFamily: "Inter, sans-serif",
};

export const sidebarStyle = {
  width: 290,
  height: "100vh",
  background: "white",
  padding: 20,
  boxSizing: "border-box",
};

export const welcomeStyle = {
  fontSize: 36,
  fontWeight: 700,
  textAlign: "center",
  marginBottom: 20,
};

export const menuTitleStyle = {
  fontSize: 20,
  color: "#707070",
  margin: "20px 0",
};

export const menuSubtitleStyle = {
  fontSize: 20,
  fontWeight: 700,
  color: "#707070",
  margin: "15px 0",
};

export const buttonBase = {
  display: "block",
  width: 230,
  height: 41,
  margin: "10px 0",
  border: "none",
  borderRadius: 5,
  fontSize: 17,
  fontWeight: 700,
  color: "white",
  cursor: "pointer",
};

export const mainStyle = {
  flex: 1,
  padding: 30,
};

export const titleStyle = {
  fontSize: 48,
  fontWeight: 700,
  marginBottom: 10,
};

export const subtitleStyle = {
  fontSize: 40,
  fontWeight: 700,
  color: "#707070",
  marginBottom: 30,
};

export const cardsWrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
};

export const cardStyle = {
  width: 250,
  background: "white",
  borderRadius: 12,
  boxShadow: "0px 17px 24px rgba(0,0,0,0.17)",
  overflow: "hidden",
  padding: 15,
};

export const cardImage = {
  width: "100%",
  borderRadius: 12,
};

export const cardTitle = {
  fontSize: 26,
  fontWeight: 700,
  margin: "10px 0",
};

export const labelStyle = {
  color: "#707070",
  fontSize: 13,
};

export const categoryStyle = {
  color: "#00550A",
  fontWeight: 700,
};

export const cardText = {
  fontSize: 13,
  color: "black",
};

export const viewBtn = {
  ...buttonBase,
  background: "#00550A",
  marginTop: 10,
};