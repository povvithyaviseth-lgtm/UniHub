import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const navigate = useNavigate();   

// Handles creating a user and submitting
const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // If you configured Vite proxy, this relative URL is correct
    const response = await fetch('/api/students/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // add credentials if you plan to use cookies/sessions:
      // credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    // Attempt to parse JSON safely
    let data;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (response.ok) {
      alert(data.message || 'Signed up!');
      navigate('/home');
    } else {
      alert(data.message || `Signup failed (status ${response.status})`);
    }
  } catch (err) {
    console.error('Error signing up:', err);
    alert('Network/server error. Please try again.');
  }
};

// Handles navigating to Student Login
  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#f3f3f3', position: 'relative', width: '100%', height: '100vh' }} data-name="Sign Up">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <div style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center', padding: '125px 56px', position: 'relative', width: '100%', height: '100%' }}>
          <div style={{ backgroundColor: 'white', height: '692px', overflow: 'clip', position: 'relative', borderRadius: '20px', boxShadow: '0px 15px 30px 0px rgba(0,0,0,0.25)', flexShrink: 0, width: '779px' }}>
            <div style={{ position: 'absolute', height: '643px', left: '27px', overflow: 'clip', top: '31px', width: '724px' }}>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', justifyContent: 'center', lineHeight: '0', left: '362px', fontStyle: 'normal', fontSize: '64px', color: 'black', textAlign: 'center', top: '38.5px', transform: 'translate(-50%, -50%)', width: '724px' }}>
                <p style={{ lineHeight: 'normal' }}>Sign Up</p>
              </div>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', justifyContent: 'center', lineHeight: '0', left: '361.5px', fontStyle: 'normal', color: '#707070', fontSize: '20.031px', textAlign: 'center', top: '116px', transform: 'translate(-50%, -50%)', width: '353px' }}>
                <p style={{ lineHeight: 'normal' }}>Sign up to discover and join the perfect club for you!</p>
              </div>

              <form onSubmit={handleSubmit}>
                <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', lineHeight: 'normal', left: '25px', right: '25px', fontSize: '20px', color: 'black', top: '156px', margin: 0 }}>Email</p>

                <div style={{ position: 'absolute', height: '59px', left: '25px', right: '25px', top: '180px' }}>
                  <div style={{ position: 'absolute', backgroundColor: 'rgba(30,64,175,0)', height: '50px', left: 0, borderRadius: '10.015px', top: '5px', width: '674px' }}>
                    <div aria-hidden="true" style={{ position: 'absolute', border: '1.5px solid #eeeeee', inset: 0, pointerEvents: 'none', borderRadius: '10.015px' }} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={{ position: 'absolute', backgroundColor: 'transparent', height: '50px', left: '12px', right: '17px', top: '30px', transform: 'translateY(-50%)', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', color: '#707070', fontSize: '17px', border: 'none', outline: 'none', width: '645px' }}
                  />
                </div>

                <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', lineHeight: 'normal', left: '25px', right: '25px', fontSize: '20px', color: '#404040', top: '254px', margin: 0 }}>Password</p>

                <div style={{ position: 'absolute', height: '59px', left: '25px', right: '25px', top: '278px' }}>
                  <div style={{ position: 'absolute', backgroundColor: 'rgba(30,64,175,0)', height: '50px', left: 0, borderRadius: '10.015px', top: '5px', width: '674px' }}>
                    <div aria-hidden="true" style={{ position: 'absolute', border: '1.5px solid #eeeeee', inset: 0, pointerEvents: 'none', borderRadius: '10.015px' }} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{ position: 'absolute', backgroundColor: 'transparent', height: '50px', left: '13px', right: '13px', top: '34px', transform: 'translateY(-50%)', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', color: '#707070', fontSize: '17px', border: 'none', outline: 'none', width: '648px' }}
                  />
                </div>

                <p style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', lineHeight: 'normal', left: '25px', right: '25px',
                            fontSize: '20px',
                            color: '#404040',
                            top: '352px', // adjust top position accordingly
                            margin: 0
                          }}>Confirm Password</p>

                <div style={{ position: 'absolute', height: '59px', left: '25px', right: '25px', top: '376px' }}>
                <div style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(30,64,175,0)',
                  height: '50px',
                  left: 0,
                  borderRadius: '10.015px',
                  top: '5px',
                  width: '674px'
                }}>
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  border: '1.5px solid #eeeeee',
                  inset: 0,
                  pointerEvents: 'none',
                  borderRadius: '10.015px'
                }} />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
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
                width: '648px'
              }}
                placeholder="Re-enter your password"
              />
              </div>

                <button type="submit" style={{ position: 'absolute', backgroundColor: '#00550a', height: '59px', left: '25px', top: '450px', width: '674px', cursor: 'pointer', border: 'none' }}>
                  <div style={{ position: 'absolute', backgroundColor: '#00550a', height: '50px', left: 0, borderRadius: '10.015px', top: '5px', width: '674px' }} />
                  <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', height: '50px', justifyContent: 'center', lineHeight: '0', left: '337px', fontStyle: 'normal', fontSize: '25.038px', textAlign: 'center', color: 'white', top: '30px', transform: 'translate(-50%, -50%)', width: '674px' }}>
                    <p style={{ lineHeight: 'normal', margin: 0 }}>Sign up</p>
                  </div>
                </button>
              </form>

              <div style={{ position: 'absolute', display: 'flex', height: '2px', alignItems: 'center', justifyContent: 'center', left: '25px', top: '446px', width: '674px' }}>
                <div style={{ flexShrink: 0, transform: 'scaleY(-100%)' }}>
                  <div style={{ backgroundColor: '#e6e6e6', height: '2px', width: '674px' }} />
                </div>
              </div>

              <div style={{ position: 'absolute', backgroundColor: '#83a0ff', height: '108px', left: '25px', borderRadius: '15px', top: '525px', width: '674px' }} />

              <button
                type="button"
                onClick={handleLoginClick}
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
                style={{ position: 'absolute', backgroundColor: isLoginHovered ? '#d9e5ff' : '#e9f0ff', height: '108px', left: '38px', overflow: 'clip', borderRadius: '15px', top: '525px', width: '674px', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none' }}
              >
                <div style={{ position: 'absolute', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', height: '72px', lineHeight: 'normal', left: '208px', fontStyle: 'normal', fontSize: '20px', top: '18px', width: '258px' }}>
                  <p style={{ position: 'absolute', left: '9px', right: '9px', color: '#707070', top: 0, margin: 0 }}>Already have an account?</p>
                  <p style={{ position: 'absolute', left: 0, right: 0, color: '#007d99', top: '48px', margin: 0 }}>Click to go to Student Login</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;