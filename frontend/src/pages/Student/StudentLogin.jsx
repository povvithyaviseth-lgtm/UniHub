// src/pages/Student/StudentLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentStore } from "../../store/student"; // ⬅️ adjust path if needed
import "../../index.css"; // ✅ use global font + button styles

const StudentLogin = () => {
  const navigate = useNavigate();
  const [isAdminHovered, setIsAdminHovered] = useState(false);

  const {
    credentials,
    setCredentials,
    error,
    success,
    loading,
    handleLogin,
  } = useStudentStore();

  const onSubmit = (e) => {
    handleLogin(e, navigate);
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleForgotPasswordClick = () => {
    console.log("Navigate to forgot password");
    // navigate("/forgot-password"); // when built
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
      data-name="Student Log In"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
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
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              height: "692px",
              overflow: "clip",
              position: "relative",
              borderRadius: "20px",
              boxShadow: "0px 15px 30px 0px rgba(0,0,0,0.25)",
              flexShrink: 0,
              width: "779px",
              fontFamily: "inherit",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "643px",
                left: "27px",
                overflow: "clip",
                top: "31px",
                width: "724px",
                fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "inherit",
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
                }}
              >
                <p style={{ lineHeight: "normal" }}>Student Log In</p>
              </div>

              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "inherit",
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
                }}
              >
                <p style={{ lineHeight: "normal" }}>
                  Sign in to discover and join the perfect club for you!
                </p>
              </div>

              {/* Optional error / success display */}
              {(error || success) && (
                <div
                  style={{
                    position: "absolute",
                    left: "25px",
                    right: "25px",
                    top: "150px",
                    fontFamily: "inherit",
                    fontSize: "14px",
                  }}
                >
                  {error && (
                    <p style={{ color: "red", margin: 0 }}>{error}</p>
                  )}
                  {success && (
                    <p style={{ color: "green", margin: 0 }}>{success}</p>
                  )}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <p
                  style={{
                    position: "absolute",
                    fontFamily: "inherit",
                    fontWeight: "normal",
                    lineHeight: "normal",
                    left: "25px",
                    right: "25px",
                    fontSize: "20px",
                    color: "black",
                    top: "176px",
                    margin: 0,
                  }}
                >
                  Email
                </p>

                <div
                  style={{
                    position: "absolute",
                    height: "59px",
                    left: "25px",
                    right: "25px",
                    top: "200px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(30,64,175,0)",
                      height: "50px",
                      left: 0,
                      borderRadius: "10.015px",
                      top: "5px",
                      width: "674px",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        border: "1.5px solid #eeeeee",
                        inset: 0,
                        pointerEvents: "none",
                        borderRadius: "10.015px",
                      }}
                    />
                  </div>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ email: e.target.value })
                    }
                    style={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      height: "50px",
                      left: "12px",
                      right: "17px",
                      top: "30px",
                      transform: "translateY(-50%)",
                      fontFamily: "inherit",
                      fontWeight: "bold",
                      color: "#707070",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      width: "645px",
                    }}
                    required
                  />
                </div>

                <p
                  style={{
                    position: "absolute",
                    fontFamily: "inherit",
                    fontWeight: "normal",
                    lineHeight: "normal",
                    left: "25px",
                    right: "25px",
                    fontSize: "20px",
                    color: "#404040",
                    top: "274px",
                    margin: 0,
                  }}
                >
                  Password
                </p>

                <div
                  style={{
                    position: "absolute",
                    height: "59px",
                    left: "25px",
                    right: "25px",
                    top: "298px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "rgba(30,64,175,0)",
                      height: "50px",
                      left: 0,
                      borderRadius: "10.015px",
                      top: "5px",
                      width: "674px",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        border: "1.5px solid #eeeeee",
                        inset: 0,
                        pointerEvents: "none",
                        borderRadius: "10.015px",
                      }}
                    />
                  </div>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ password: e.target.value })
                    }
                    style={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      height: "50px",
                      left: "13px",
                      right: "13px",
                      top: "34px",
                      transform: "translateY(-50%)",
                      fontFamily: "inherit",
                      fontWeight: "bold",
                      color: "#707070",
                      fontSize: "17px",
                      border: "none",
                      outline: "none",
                      width: "648px",
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    position: "absolute",
                    backgroundColor: "#00550a",
                    height: "59px",
                    left: "25px",
                    top: "372px",
                    width: "674px",
                    cursor: "pointer",
                    border: "none",
                    opacity: loading ? 0.8 : 1,
                    // let global button styles apply but keep layout
                    borderRadius: 10,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "#00550a",
                      height: "50px",
                      left: 0,
                      borderRadius: "10.015px",
                      top: "5px",
                      width: "674px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      flexDirection: "column",
                      fontFamily: "inherit",
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
                    }}
                  >
                    <p style={{ lineHeight: "normal", margin: 0 }}>
                      {loading ? "Letting you in..." : "Let me in!"}
                    </p>
                  </div>
                </button>
              </form>

              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  height: "2px",
                  alignItems: "center",
                  justifyContent: "center",
                  left: "25px",
                  top: "446px",
                  width: "674px",
                }}
              >
                <div style={{ flexShrink: 0, transform: "scaleY(-100%)" }}>
                  <div
                    style={{
                      backgroundColor: "#e6e6e6",
                      height: "2px",
                      width: "674px",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleForgotPasswordClick}
                style={{
                  position: "absolute",
                  fontFamily: "inherit",
                  fontWeight: "normal",
                  lineHeight: "normal",
                  left: "25px",
                  right: "524px",
                  color: "#007d99",
                  fontSize: "20px",
                  top: "461px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Forgot Password?
              </button>

              <button
                type="button"
                onClick={handleSignUpClick}
                style={{
                  position: "absolute",
                  fontFamily: "inherit",
                  fontWeight: "normal",
                  lineHeight: "normal",
                  left: "469px",
                  right: "25px",
                  color: "#007d99",
                  fontSize: "20px",
                  top: "456px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Don&apos;t Have an Account?
              </button>

              <div
                style={{
                  position: "absolute",
                  backgroundColor: "#83a0ff",
                  height: "108px",
                  left: "25px",
                  borderRadius: "15px",
                  top: "515px",
                  width: "674px",
                }}
              />

              <button
                type="button"
                onClick={handleAdminClick}
                onMouseEnter={() => setIsAdminHovered(true)}
                onMouseLeave={() => setIsAdminHovered(false)}
                style={{
                  position: "absolute",
                  backgroundColor: isAdminHovered ? "#d9e5ff" : "#e9f0ff",
                  height: "108px",
                  left: "38px",
                  overflow: "clip",
                  borderRadius: "15px",
                  top: "515px",
                  width: "674px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  border: "none",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    fontFamily: "inherit",
                    fontWeight: "normal",
                    height: "72px",
                    lineHeight: "normal",
                    left: "208px",
                    fontStyle: "normal",
                    fontSize: "20px",
                    top: "18px",
                    width: "258px",
                  }}
                >
                  <p
                    style={{
                      position: "absolute",
                      left: "9px",
                      right: "9px",
                      color: "#707070",
                      top: 0,
                      margin: 0,
                    }}
                  >
                    Are you an Administrator?
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      color: "#007d99",
                      top: "48px",
                      margin: 0,
                    }}
                  >
                    Click to go to Admin Login
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
