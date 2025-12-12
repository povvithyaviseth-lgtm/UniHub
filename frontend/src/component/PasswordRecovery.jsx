import React, { useState } from "react";

const PasswordRecovery = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    // Replace with your actual recovery API call
    alert(`Password recovery link sent to: ${email}`);
    onClose(); // optionally close after submit
  };

  return (
    <div
      style={{
        width: 779,
        height: 330,
        position: "relative",
        background: "white",
        boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        borderRadius: 20,
      }}
    >
      {/* Title */}
      <div
        style={{
          width: 724,
          left: 15,
          top: 18,
          position: "absolute",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "black",
          fontSize: 64,
          fontFamily: "Inter",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        Password Recovery
      </div>

      {/* Label */}
      <div
        style={{
          width: 674,
          left: 40,
          top: 110,
          position: "absolute",
          color: "black",
          fontSize: 20,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Enter Your Email
      </div>

      {/* Input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: 674,
          height: 50,
          left: 40,
          top: 134,
          position: "absolute",
          borderRadius: 10,
          border: "1.5px solid #EEEEEE",
          paddingLeft: 12,
          fontSize: 17,
          fontFamily: "Inter",
          fontWeight: "700",
          color: "#707070",
        }}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          width: 256.32,
          height: 65,
          left: 483,
          top: 232,
          position: "absolute",
          background: "#00550A",
          borderRadius: 9.81,
          color: "white",
          fontSize: 33.11,
          fontFamily: "Inter",
          fontWeight: "700",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          width: 235,
          height: 65,
          left: 40,
          top: 232,
          position: "absolute",
          background: "#E1E1E3",
          borderRadius: 8,
          color: "#6B6767",
          fontSize: 32,
          fontFamily: "Inter",
          fontWeight: "700",
          border: "none",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default PasswordRecovery;