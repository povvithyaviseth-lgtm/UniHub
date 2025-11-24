// style.jsx
export const container = {
  width: 1029,
  height: 773,
  position: 'relative',
  background: 'white',
  boxShadow: '0px 23px 32px rgba(0, 0, 0, 0.17)',
  overflow: 'hidden',
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
  padding: "0 27px",               // spacing inside
};

export const headerText = {
  color: "#707070",
  fontSize: "27px",
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
};


export const listContainer = {
  width: 962,
  height: 648,
  left: 33,
  top: 100,
  position: 'absolute',
  overflow: 'hidden',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: 10,
  display: 'inline-flex',
};

export const row = {
  width: 962,
  height: 70,
  position: 'relative',
};

export const clubName = {
  width: 541,
  left: 46,
  top: 23,
  position: 'absolute',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  color: 'black',
  fontSize: 20,
  fontFamily: 'Inter',
  fontWeight: '700',
  wordWrap: 'break-word',
};

export const deleteButton = {
  width: 142,
  height: 59,
  left: 815,
  top: 5,
  position: 'absolute',
  textAlign: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  color: '#BF0000',
  fontSize: 20,
  fontFamily: 'Inter',
  fontWeight: '700',
  wordWrap: 'break-word',
};

export const divider = {
  width: 962,
  height: 2,
  left: 0,
  position: 'absolute',
  background: '#B7B7B7',
};