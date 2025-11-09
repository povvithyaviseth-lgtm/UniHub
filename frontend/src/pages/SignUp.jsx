import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const REGISTERED_EMAILS = [
  "test@example.com",
  "user@test.com",
  "admin@example.com",
];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Invalid email format." });
      return;
    }

    if (REGISTERED_EMAILS.includes(email.toLowerCase())) {
      setMessage({ type: "error", text: "Account already exists." });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setMessage({ type: "success", text: `Account created! Welcome ${email}` });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#00550A",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const toggleButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        padding: "50px",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Sign Up</h1>
        <p style={{ color: "#707070", marginBottom: "20px" }}>
          Signup to discover and join the perfect club for you!
        </p>

        {message && (
          <div
            style={{
              marginBottom: "10px",
              color: message.type === "error" ? "red" : "green",
            }}
          >
            {message.text}
          </div>
        )}

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Email</label>
          <input
            type="email"
            style={inputStyle}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              style={{ ...inputStyle, paddingRight: "40px" }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              style={{
                ...toggleButtonStyle,
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label>Confirm Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              style={{ ...inputStyle, paddingRight: "40px" }}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              style={{
                ...toggleButtonStyle,
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button style={buttonStyle} onClick={handleSignup}>
          Sign Up
        </button>

        <p style={{ marginTop: "20px", color: "#707070" }}>
          Already have an account?{" "}
          <button
            onClick={() => alert("Navigate to Student Login")}
            style={{ background: "none", border: "none", color: "#007d99", cursor: "pointer", textDecoration: "underline" }}
          >
            Go to Login
          </button>
        </p>
      </div>
    </div>
  );
}
