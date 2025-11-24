export const buttonBase = {
  padding: "10px 50px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "5px 0",
  fontSize: "17px",
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
  color: "white",
  width: "244px",          // match fixed width
  height: "41px",          // match fixed height
  background: "rgba(0, 85, 10, 0.56)", // green tone similar to original
  textAlign: "center",     // center text horizontally
  display: "flex",         // flex for vertical centering
  alignItems: "center",
  justifyContent: "center",
}


export const activeBtn = {
  ...buttonBase,
  background: "#00550A",   // solid green when active
};

export const unActiveBtn = {
  ...buttonBase,
  background: "rgba(0, 85, 10, 0.56)", // dimmed green when inactive
};

export const signoutBtn = {
  ...buttonBase,
  background: "#A60000",
  fontSize: 27,
};