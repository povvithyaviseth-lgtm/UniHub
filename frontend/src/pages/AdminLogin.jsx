import { useState } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../functions/authService.js";
import {
  containerStyle,
  cardWrapper,
  inner,
  titleStyle,
  subtitle,
  inputWrapper,
  inputStyle,
  labelStyle,
  forgotStyle,
  signInWrapper,
  signInButton,
  footerBg,
  footerInner,
  studentBox,
  studentText,
  studentLink,
} from "../Style/AdminLoginPageStyle.jsx";


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");

  async function handleSignIn() {
    setError(""); // Clear any previous errors
    setLoading(true);
    
    try {
      const userData = await userLogin(email, password);
      window.location.href = "/adminDashboard"; // Dashboard for admin after login
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardWrapper}>
        <div style={inner}>
          <div style={titleStyle}>Admin Portal</div>
          <div style={subtitle}>Sign in to manage and moderate clubs.</div>

          <div style={inputWrapper(200)}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputWrapper(298)}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={labelStyle(25, 176)}>Email</div>
          <div style={labelStyle(25, 274)}>Password</div>

          {/* Rename the File */}
          <Link to="/ForgetPassword" style={forgotStyle}>
            Forgot Password?
          </Link>

          <div style={signInWrapper}>
            {error && (
              <div style={{
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "10px",
                textAlign: "center",
                position: "absolute",
                width: "100%",
                top: "-25px"
              }}>
                {error}
              </div>
            )}
            <button
              onClick={handleSignIn}
              disabled={loading}
              style={{
                ...signInButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Signing in..." : "Sign In As Admin"}
            </button>
          </div>

          <div style={{ width: 674, height: 2, left: 25, top: 446, position: "absolute", background: "#E6E6E6" }} />

          <div style={footerBg} />
          <div style={footerInner}>
            <div style={studentBox}>
              <div style={studentText}>Are you a Student?</div>

              <Link to="/" style={studentLink}>
                Click to go to Student Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}