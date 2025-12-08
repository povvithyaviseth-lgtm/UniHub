import { useNavigate } from 'react-router-dom';
import { useStudentStore } from '../../store/student.js';
import * as styles from '../../Style/signUpPageStyle.jsx';

const SignUp = () => {
  const {
    credentials,
    setCredentials,
    isLoginHovered,
    setIsLoginHovered,
    error,
    success,
    loading,
    handleSubmit,
  } = useStudentStore();

  const navigate = useNavigate();

  return (
    <div style={styles.container} data-name="Sign Up">
      <div style={styles.centerWrapper}>
        <div style={styles.cardWrapper}>
          <div style={styles.card}>
            <div style={styles.cardContent}>
              <div style={styles.heading}>
                <p style={{ lineHeight: 'normal' }}>Sign Up</p>
              </div>
              <div style={styles.subheading}>
                <p style={{ lineHeight: 'normal' }}>
                  Sign up to discover and join the perfect club for you!
                </p>
              </div>

              {error && <div style={styles.alertError}>{error}</div>}
              {success && <div style={styles.alertSuccess}>{success}</div>}

              <form onSubmit={handleSubmit}>
                <p style={styles.label('156px')}>Email</p>
                <div style={styles.inputWrapper('180px')}>
                  <div style={{ position: 'absolute', height: '50px', left: 0, top: '5px', width: '674px' }}>
                    <div aria-hidden="true" style={styles.inputBorder} />
                  </div>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    style={styles.inputField}
                  />
                </div>

                <p style={styles.label('254px', '#404040')}>Password</p>
                <div style={styles.inputWrapper('278px')}>
                  <div style={{ position: 'absolute', height: '50px', left: 0, top: '5px', width: '674px' }}>
                    <div aria-hidden="true" style={styles.inputBorder} />
                  </div>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    style={styles.inputField}
                  />
                </div>

                <p style={styles.label('352px', '#404040')}>Confirm Password</p>
                <div style={styles.inputWrapper('376px')}>
                  <div style={{ position: 'absolute', height: '50px', left: 0, top: '5px', width: '674px' }}>
                    <div aria-hidden="true" style={styles.inputBorder} />
                  </div>
                  <input
                    type="password"
                    value={credentials.confirmPassword}
                    onChange={(e) =>
                      setCredentials({ ...credentials, confirmPassword: e.target.value })
                    }
                    placeholder="Re-enter your password"
                    style={styles.inputField}
                  />
                </div>

                <button type="submit" disabled={loading} style={styles.submitButton(loading)}>
                  <div style={{ position: 'absolute', backgroundColor: '#00550a', height: '50px', left: 0, top: '5px', width: '674px', borderRadius: '10.015px' }} />
                  <div style={styles.submitText}>
                    <p style={{ lineHeight: 'normal', margin: 0 }}>
                      {loading ? 'Signing up…' : 'Sign up'}
                    </p>
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
                onClick={() => navigate('/')}
                onMouseEnter={() => setIsLoginHovered(true)}
                onMouseLeave={() => setIsLoginHovered(false)}
                style={styles.loginButton(isLoginHovered)}
              >
                <div style={styles.loginText}>
                  <p style={{ position: 'absolute', left: '9px', right: '9px', color: '#707070', top: 0, margin: 0 }}>
                    Already have an account?
                  </p>
                  <p style={{ position: 'absolute', left: 0, right: 0, color: '#007d99', top: '48px', margin: 0 }}>
                    Click to go to Student Login
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

export default SignUp;