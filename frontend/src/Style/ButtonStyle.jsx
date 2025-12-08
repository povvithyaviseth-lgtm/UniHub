// src/Style/ButtonStyle.jsx

// Base style shared by all sidebar buttons
export const buttonBase = {
  width: "100%",            // fill sidebar width
  height: 48,
  padding: "0 18px",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  margin: "4px 0",

  display: "flex",
  alignItems: "center",
  justifyContent: "center", // center text horizontally

  fontSize: 16,
  fontWeight: 700,
  // ❗ do NOT set fontFamily – let index.css win
  color: "#FFFFFF",

  background: "rgba(0, 85, 10, 0.56)",

  textAlign: "center",
  whiteSpace: "nowrap",      // <-- keeps “Approve Clubs” on ONE LINE
  lineHeight: 1.2,
};

// Active / inactive / sign-out variants
export const activeBtn = {
  ...buttonBase,
  background: "#00550A",
};

export const unActiveBtn = {
  ...buttonBase,
  background: "rgba(0, 85, 10, 0.56)",
};

export const signoutBtn = {
  ...buttonBase,
  background: "#A60000",
  fontSize: 18,
  marginTop: 16,
};
