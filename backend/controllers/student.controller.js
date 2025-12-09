import AuthService from '../services/auth.service.js';

export const registerStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    await AuthService.userSignUp(email, password);
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'Email already registered' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// ⭐ LOGIN CONTROLLER
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const student = await AuthService.userLogin(email, password);

    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      studentId: student._id,
      email: student.email
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};