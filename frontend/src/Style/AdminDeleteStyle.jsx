// style.jsx
export const container = {
  width: 1029,
  height: 773,
  position: "relative",
  background: "white",
  boxShadow: "0px 23px 32px rgba(0, 0, 0, 0.17)",
  overflow: "hidden",
  borderRadius: 17,
};

export const header = {
  width: "962px",
  height: "70px",
  position: "absolute",
  left: "33px",
  top: "16px",
  background: "#F4F4F4",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between", // pushes items left & right
  padding: "0 27px", // spacing inside
};

export const headerText = {
  color: "#707070",
  fontSize: "27px",
  fontWeight: 700,
};

export const listContainer = {
  width: 962,
  height: 625,
  left: 33,
  top: 100,
  position: "absolute",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

export const row = {
  width: 962,
  height: 68,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 27px",
  position: "relative",
};

export const clubName = {
  color: "black",
  fontSize: 20,
  fontWeight: "700",
  wordWrap: "break-word",
};

export const deleteButton = {
  color: "#BF0000",
  fontSize: 20,
  fontWeight: "700",
  cursor: "pointer",
  background: "none",
  border: "none",
};

export const divider = {
  width: 962,
  height: 2,
  left: 0,
  position: "absolute",
  background: "#B7B7B7",
};
