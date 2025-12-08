export const containerStyle = {
  width: "100vw",
  height: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#F5F5F5",
};

export const cardWrapper = {
  width: 779,
  height: 692,
  position: "relative",
  background: "white",
  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
  borderRadius: 20,
};

export const inner = {
  width: 724,
  height: 643,
  left: 27,
  top: 31,
  position: "absolute",
  overflow: "hidden",
};

export const titleStyle = {
  width: 724,
  left: 0,
  top: 0,
  position: "absolute",
  textAlign: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  color: "black",
  fontSize: 64,
  fontWeight: 700,
  wordWrap: "break-word",
};

export const subtitle = {
  width: 353,
  left: 185,
  top: 92,
  position: "absolute",
  textAlign: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  color: "#5B5A5A",
  fontSize: 20.03,
  fontWeight: 400,
  wordWrap: "break-word",
};

export const labelStyle = (left, top) => ({
  width: 674,
  left,
  top,
  position: "absolute",
  color: "#404040",
  fontSize: 20,
  fontWeight: 400,
  wordWrap: "break-word",
});

export const inputWrapper = (top) => ({
  width: 674,
  height: 59,
  left: 25,
  top,
  position: "absolute",
});

export const inputStyle = {
  width: 674,
  height: 50,
  left: 0,
  top: 5,
  position: "absolute",
  background: "rgba(30, 64, 175, 0)",
  borderRadius: 10.02,
  border: "1.5px solid #EEEEEE",
  padding: "0 12px",
  boxSizing: "border-box",
  fontSize: 16,
};

export const forgotStyle = {
  width: 175,
  left: 25,
  top: 461,
  position: "absolute",
  color: "#007D99",
  fontSize: 20,
  fontWeight: 400,
  wordWrap: "break-word",
};

export const signInWrapper = {
  width: 674,
  height: 59,
  left: 25,
  top: 372,
  position: "absolute",
};

export const signInBack = {
  width: 674,
  height: 50,
  left: 0,
  top: 5,
  position: "absolute",
  background: "#00550A",
  borderRadius: 10.02,
};

export const signInButton = {
  width: 674,
  height: 50,
  left: 0,
  top: 5,
  position: "absolute",
  textAlign: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  color: "white",
  fontSize: 25.04,
  fontWeight: 700,
  wordWrap: "break-word",
  border: "none",
  cursor: "pointer",
  background: "#00550A",
  borderRadius: 10.02,
  outline: "none",
};

export const footerBg = {
  width: 674,
  height: 108,
  left: 25,
  top: 515,
  position: "absolute",
  background: "#83A0FF",
  borderRadius: 15,
};

export const footerInner = {
  width: 674,
  height: 108,
  left: 38,
  top: 515,
  position: "absolute",
  background: "#E9F0FF",
  overflow: "hidden",
  borderRadius: 15,
};

export const studentBox = {
  width: 258,
  height: 72,
  left: 208,
  top: 18,
  position: "absolute",
};

export const studentText = {
  width: 240,
  left: 10,
  top: 0,
  position: "absolute",
  color: "#404040",
  fontSize: 20,
  fontWeight: 400,
  wordWrap: "break-word",
};

export const studentLink = {
  width: 276,
  left: -23,
  top: 48,
  position: "absolute",
  color: "#007D99",
  fontSize: 20,
  fontWeight: 400,
  wordWrap: "break-word",
  textDecoration: "none",
};
