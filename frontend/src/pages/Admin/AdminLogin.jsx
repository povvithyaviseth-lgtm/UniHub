// src/pages/Admin/AdminLogin.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../store/admin.js";

// 🆕 Import the modal wrapper and content
import PopUpModals from "../../component/PopUpModals.jsx"; 
import PasswordRecovery from "../../component/PasswordRecovery.jsx"; 

import {
  containerStyle,
  cardWrapper,
  inner,
  titleStyle,
  subtitle,
  inputWrapper,
  inputStyle,
  labelStyle,
  forgotStyle, // We will re-use the style but use a button instead of a Link
  signInWrapper,
  signInButton,
  footerBg,
  footerInner,
  studentBox,
  studentText,
  studentLink,
} from "../../Style/AdminLoginPageStyle.jsx";

// ✅ Ensure global font + base styles from index.css are applied
import "../../index.css";

const AdminLogin = () => {
  // 🆕 State for the Password Recovery Modal
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  const {
    credentials,
    setCredentials,
    error,
    setError,
    loading,
    setLoading,
    login,
  } = useAdminStore();

  const handleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await login();
      if (!response) {
        setError("Login service returned no response");
        return;
      }

      const { success, message } = response;
      if (!success) {
        setError(message || "Login failed");
      } else {
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  // 🆕 Function to open the recovery modal
  const handleForgotPasswordClick = () => {
    setIsRecoveryOpen(true);
  };
  
  // Helper style to make the button look like the link style
  const forgotButtonStyle = {
    ...forgotStyle,
    background: 'none', // Remove any background button might have
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    textAlign: 'left',
  };

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
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              style={inputStyle}
            />
          </div>

          <div style={inputWrapper(298)}>
            <input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              style={inputStyle}
            />
          </div>

          <div style={labelStyle(25, 176)}>Email</div>
          <div style={labelStyle(25, 274)}>Password</div>

          <div style={signInWrapper}>
            {error && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginBottom: "10px",
                  textAlign: "center",
                  position: "absolute",
                  width: "100%",
                  top: "-25px",
                }}
              >
                {error}
              </div>
            )}
            <button
              onClick={handleSignIn}
              disabled={loading}
              style={{
                ...signInButton,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign In As Admin"}
            </button>
          </div>

          <div
            style={{
              width: 674,
              height: 2,
              left: 25,
              top: 446,
              position: "absolute",
              background: "#E6E6E6",
            }}
          />

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
};

export default AdminLogin;