/*export const containerStyle = {
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
  fontFamily: "Inter, sans-serif",
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
  fontFamily: "Inter, sans-serif",
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
  fontFamily: "Inter, sans-serif",
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
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
  background: "#00550A",
  borderRadius: 10.02,
  outline: "none",
};*/
 //Container - outer wrapper
// Container - outer wrapper
/*export const containerStyle = {
  background: "#f3f3f3",
  position: "relative",
  width: "100%",
  height: "100%",
};

// Flex container - centers the card
export const flexContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
};

// Padding wrapper
export const paddingWrapper = {
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
  justifyContent: "center",
  padding: "125px 56px",
  position: "relative",
  width: "100%",
  height: "100%",
};

// White card wrapper
export const cardWrapper = {
  background: "white",
  height: "692px",
  overflow: "clip",
  position: "relative",
  borderRadius: "20px",
  boxShadow: "0px 15px 30px 0px rgba(0,0,0,0.25)",
  flexShrink: 0,
  width: "779px",
};

// Inner container
export const inner = {
  position: "absolute",
  height: "643px",
  left: "27px",
  overflow: "clip",
  top: "31px",
  width: "724px",
};

// Title
export const titleStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  justifyContent: "center",
  lineHeight: "0",
  left: "362px",
  fontStyle: "normal",
  fontSize: "64px",
  color: "black",
  textAlign: "center",
  top: "38.5px",
  transform: "translate(-50%, -50%)",
  width: "724px",
};

export const titleText = {
  lineHeight: "normal",
  margin: 0,
};

// Subtitle
export const subtitle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  justifyContent: "center",
  lineHeight: "0",
  left: "361.5px",
  fontStyle: "normal",
  color: "#707070",
  fontSize: "20.031px",
  textAlign: "center",
  top: "116px",
  transform: "translate(-50%, -50%)",
  width: "353px",
};
/*export const subtitle = {
  position: "absolute" ,
  display: "flex",
  flexDirection: "column" ,
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal" ,
  justifyContent: "center",
  lineHeight: "normal",
  left: "361.5px",
  fontStyle: "normal",
  color: "#707070",
  fontSize: "20.031px",
  textAlign: "center" ,
  top: "116px",
  transform: "translate(-50%, -50%)",
  width: "353px",
};


export const subtitleText = {
  lineHeight: "normal",
  margin: 0,
};

// Email Label
export const emailLabel = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  lineHeight: "normal",
  left: "25px",
  fontStyle: "normal",
  fontSize: "20px",
  color: "black",
  top: "176px",
  margin: 0,
};

// Password Label
export const passwordLabel = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  lineHeight: "normal",
  left: "25px",
  fontStyle: "normal",
  fontSize: "20px",
  color: "#404040",
  top: "274px",
  margin: 0,
};

// Email Input Wrapper
export const emailInputWrapper = {
  position: "absolute",
  height: "59px",
  left: "25px",
  top: "200px",
  width: "674px",
};

// Password Input Wrapper
export const passwordInputWrapper = {
  position: "absolute",
  height: "59px",
  left: "25px",
  top: "298px",
  width: "674px",
};

// Input border container
export const inputBorder = {
  position: "absolute",
  background: "rgba(30,64,175,0)",
  height: "50px",
  left: 0,
  borderRadius: "10.015px",
  top: "5px",
  width: "674px",
};

// Input border inner
export const inputBorderInner = {
  position: "absolute",
  border: "1.5px solid #eeeeee",
  inset: 0,
  pointerEvents: "none",
  borderRadius: "10.015px",
};

// Email input field
export const emailInput = {
  position: "absolute",
  background: "transparent",
  border: "none",
  outline: "none",
  height: "50px",
  left: "12px",
  top: "30px",
  transform: "translateY(-50%)",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  fontSize: "17px",
  color: "#707070",
  width: "calc(100% - 29px)",
  padding: 0,
};

// Password input field
export const passwordInput = {
  position: "absolute",
  background: "transparent",
  border: "none",
  outline: "none",
  height: "50px",
  left: "13px",
  top: "34px",
  transform: "translateY(-50%)",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  fontSize: "17px",
  color: "#707070",
  width: "calc(100% - 26px)",
  padding: 0,
};

// Sign In Button Wrapper
export const signInButtonWrapper = {
  position: "absolute",
  background: "#00550a",
  height: "59px",
  left: "25px",
  top: "372px",
  width: "674px",
  border: "none",
  cursor: "pointer",
  padding: 0,
};

// Sign In Button Background
export const signInButtonBg = {
  position: "absolute",
  background: "#00550a",
  height: "50px",
  left: 0,
  borderRadius: "10.015px",
  top: "5px",
  width: "674px",
};

// Sign In Button Text Container
export const signInButtonTextContainer = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  height: "50px",
  justifyContent: "center",
  lineHeight: "0",
  left: "337px",
  fontStyle: "normal",
  fontSize: "25.038px",
  textAlign: "center",
  color: "white",
  top: "30px",
  transform: "translate(-50%, -50%)",
  width: "674px",
};

// Sign In Button Text
export const signInButtonText = {
  lineHeight: "normal",
  margin: 0,
};

// Divider
export const dividerWrapper = {
  position: "absolute",
  display: "flex",
  height: "2px",
  alignItems: "center",
  justifyContent: "center",
  left: "25px",
  top: "446px",
  width: "674px",
};

export const dividerInner = {
  flexShrink: 0,
  transform: "scaleY(-100%)",
};

export const dividerLine = {
  background: "#e6e6e6",
  height: "2px",
  width: "674px",
};

// Forgot Password Link
export const forgotPasswordLink = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  lineHeight: "normal",
  left: "25px",
  fontStyle: "normal",
  color: "#007d99",
  fontSize: "20px",
  top: "461px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  padding: 0,
  margin: 0,
};

// Sign Up Link
export const signUpLink = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  lineHeight: "normal",
  left: "469px",
  fontStyle: "normal",
  color: "#007d99",
  fontSize: "20px",
  top: "456px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  padding: 0,
  margin: 0,
};

// Admin Section Background
export const adminSectionBg = {
  position: "absolute",
  background: "#83a0ff",
  height: "108px",
  left: "25px",
  borderRadius: "15px",
  top: "515px",
  width: "674px",
};

// Admin Section Button
export const adminSectionButton = (isHovered) => ({
  position: "absolute",
  background: isHovered ? "#d9e5ff" : "#e9f0ff",
  height: "108px",
  left: "38px",
  overflow: "clip",
  borderRadius: "15px",
  top: "515px",
  width: "674px",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
  padding: 0,
});

// Admin Section Text Container
export const adminSectionTextContainer = {
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  height: "72px",
  lineHeight: "normal",
  left: "208px",
  fontStyle: "normal",
  fontSize: "20px",
  top: "18px",
  width: "258px",
};

// Admin Section Text Top
export const adminSectionTextTop = {
  position: "absolute",
  left: "9px",
  color: "#707070",
  top: 0,
  margin: 0,
};

// Admin Section Text Bottom
export const adminSectionTextBottom = {
  position: "absolute",
  left: 0,
  color: "#007d99",
  top: "48px",
  margin: 0,
};
//export const signInButton = signInButtonWrapper;
// ✅ Aliases for existing fields so imports still work
//export const inputStyle = emailInput; 
//export const inputWrapper = () => emailInputWrapper;*/
export const containerStyle = {
  background: "#f3f3f3",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

// Card Wrapper
export const cardWrapper = {
  background: "white",
  height: "692px",
  overflow: "clip",
  position: "relative",
  borderRadius: "20px",
  boxShadow: "0px 15px 30px 0px rgba(0,0,0,0.25)",
  flexShrink: 0,
  width: "100%",
  maxWidth: "779px",
};

// Inner content
export const inner = {
  position: "absolute",
  height: "643px",
  left: "27px",
  overflow: "clip",
  top: "31px",
  width: "724px",
};

// Title
export const titleStyle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  justifyContent: "center",
  lineHeight: "normal",
  left: "362px",
  fontStyle: "normal",
  fontSize: "64px",
  color: "black",
  textAlign: "center",
  top: "38.5px",
  transform: "translate(-50%, -50%)",
  width: "724px",
};

// Subtitle
export const subtitle = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  justifyContent: "center",
  lineHeight: "normal",
  left: "361.5px",
  fontStyle: "normal",
  color: "#707070",
  fontSize: "20.031px",
  textAlign: "center",
  top: "116px",
  transform: "translate(-50%, -50%)",
  width: "353px",
};

// Label style
export const labelStyle = (top) => ({
  position: "absolute",
  lineHeight: "normal",
  left: "25px",
  fontStyle: "normal",
  fontSize: "20px",
  color: "black",
  top,
});

// Input wrapper generator
export const inputWrapper = (top) => ({
  position: "absolute",
  height: "59px",
  left: "25px",
  top,
  width: "674px",
});

// Input border box
export const inputBorderBox = {
  position: "absolute",
  backgroundColor: "rgba(30,64,175,0)",
  height: "50px",
  left: "0",
  borderRadius: "10.015px",
  top: "5px",
  width: "100%",
};

// Input border
export const inputBorder = {
  position: "absolute",
  border: "1.5px solid #eeeeee",
  inset: "0",
  pointerEvents: "none",
  borderRadius: "10.015px",
};

// Input field
export const inputStyle = {
  position: "absolute",
  backgroundColor: "transparent",
  height: "100%",
  left: "12px",
  right: "17px",
  top: "0",
  fontFamily: "Inter, sans-serif",
  fontWeight: "bold",
  color: "#707070",
  fontSize: "17px",
  border: "none",
  outline: "none",
  padding: "0",
};

// Sign In button
export const signInButtonWrapper = {
  position: "absolute",
  background: "#00550a",
  height: "59px",
  left: "25px",
  top: "372px",
  width: "674px",
  cursor: "pointer",
  border: "none",
  borderRadius: "10.015px",
  color: "white",
  fontSize: "25.038px",
  fontWeight: "bold",
  fontFamily: "Inter, sans-serif",
};

// Divider container
export const dividerContainer = {
  position: "absolute",
  display: "flex",
  height: "2px",
  alignItems: "center",
  justifyContent: "center",
  left: "25px",
  top: "446px",
  width: "674px",
};

// Divider line
export const dividerLine = {
  backgroundColor: "#e6e6e6",
  height: "2px",
  width: "100%",
};

// Link styles
export const linkStyle = (top, left, right) => ({
  position: "absolute",
  fontFamily: "Inter, sans-serif",
  fontWeight: "normal",
  lineHeight: "normal",
  color: "#007d99",
  fontSize: "20px",
  top,
  ...(left && { left }),
  ...(right && { right }),
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  textDecoration: "none",
});

// Admin section background
export const adminSectionBg = {
  position: "absolute",
  backgroundColor: "#83a0ff",
  height: "108px",
  left: "25px",
  borderRadius: "15px",
  top: "515px",
  width: "674px",
};

// Admin section
export const adminSection = (isHovered) => ({
  position: "absolute",
  backgroundColor: isHovered ? "#d9e5ff" : "#e9f0ff",
  height: "108px",
  left: "38px",
  overflow: "clip",
  borderRadius: "15px",
  top: "515px",
  width: "648px",
  cursor: "pointer",
  border: "none",
  transition: "background-color 0.3s",
});

// Admin text container
export const adminTextContainer = {
  position: "absolute",
  height: "72px",
  lineHeight: "normal",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

// Admin text - first line
export const adminTextLine1 = {
  color: "#707070",
  fontSize: "20px",
  margin: "0 0 12px 0",
};

// Admin text - second line
export const adminTextLine2 = {
  color: "#007d99",
  fontSize: "20px",
  margin: "0",
};
