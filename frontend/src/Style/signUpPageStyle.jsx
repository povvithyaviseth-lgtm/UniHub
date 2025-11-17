export const container = {
  backgroundColor: '#f3f3f3',
  position: 'relative',
  width: '100%',
  height: '100vh',
};

export const centerWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};

export const cardWrapper = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '125px 56px',
  position: 'relative',
  width: '100%',
  height: '100%',
};

export const card = {
  backgroundColor: 'white',
  height: '692px',
  overflow: 'clip',
  position: 'relative',
  borderRadius: '20px',
  boxShadow: '0px 15px 30px 0px rgba(0,0,0,0.25)',
  flexShrink: 0,
  width: '779px',
};

export const cardContent = {
  position: 'absolute',
  height: '643px',
  left: '27px',
  overflow: 'clip',
  top: '31px',
  width: '724px',
};

export const heading = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
  justifyContent: 'center',
  lineHeight: '0',
  left: '362px',
  fontStyle: 'normal',
  fontSize: '64px',
  color: 'black',
  textAlign: 'center',
  top: '38.5px',
  transform: 'translate(-50%, -50%)',
  width: '724px',
};

export const subheading = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'normal',
  justifyContent: 'center',
  lineHeight: '0',
  left: '361.5px',
  fontStyle: 'normal',
  color: '#707070',
  fontSize: '20.031px',
  textAlign: 'center',
  top: '116px',
  transform: 'translate(-50%, -50%)',
  width: '353px',
};

export const alertError = {
  position: 'absolute',
  left: '25px',
  right: '25px',
  top: '130px',
  padding: '12px 14px',
  borderRadius: '10px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  lineHeight: 1.3,
  color: '#7a0b0b',
  backgroundColor: '#fdecec',
  border: '1px solid #f3b3b3',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  textAlign: 'center',
  zIndex: 1,
};

export const alertSuccess = {
  position: 'absolute',
  left: '25px',
  right: '25px',
  top: '130px',
  padding: '12px 14px',
  borderRadius: '10px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  lineHeight: 1.3,
  color: '#0b5f2a',
  backgroundColor: '#e8f8ef',
  border: '1px solid #b7e3c9',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  textAlign: 'center',
  zIndex: 1,
};

export const label = (top, color = 'black') => ({
  position: 'absolute',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'normal',
  lineHeight: 'normal',
  left: '25px',
  right: '25px',
  fontSize: '20px',
  color,
  top,
  margin: 0,
});

export const inputWrapper = (top) => ({
  position: 'absolute',
  height: '59px',
  left: '25px',
  right: '25px',
  top,
});

export const inputField = {
  position: 'absolute',
  backgroundColor: 'transparent',
  height: '50px',
  left: '13px',
  right: '13px',
  top: '34px',
  transform: 'translateY(-50%)',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'normal',
  color: '#707070',
  fontSize: '17px',
  border: 'none',
  outline: 'none',
  width: '648px',
};

export const inputBorder = {
  position: 'absolute',
  border: '1.5px solid #eeeeee',
  inset: 0,
  pointerEvents: 'none',
  borderRadius: '10.015px',
};

export const submitButton = (loading) => ({
  position: 'absolute',
  backgroundColor: '#00550a',
  height: '59px',
  left: '25px',
  top: '450px',
  width: '674px',
  cursor: loading ? 'not-allowed' : 'pointer',
  border: 'none',
  opacity: loading ? 0.7 : 1,
});

export const submitText = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'bold',
  height: '50px',
  justifyContent: 'center',
  lineHeight: '0',
  left: '337px',
  fontStyle: 'normal',
  fontSize: '25.038px',
  textAlign: 'center',
  color: 'white',
  top: '30px',
  transform: 'translate(-50%, -50%)',
  width: '674px',
};

export const loginButton = (hovered) => ({
  position: 'absolute',
  backgroundColor: hovered ? '#d9e5ff' : '#e9f0ff',
  height: '108px',
  left: '38px',
  overflow: 'clip',
  borderRadius: '15px',
  top: '525px',
  width: '674px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  border: 'none',
});

export const loginText = {
  position: 'absolute',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 'normal',
  height: '72px',
  lineHeight: 'normal',
  left: '208px',
  fontStyle: 'normal',
  fontSize: '20px',
  top: '18px',
  width: '258px',
};