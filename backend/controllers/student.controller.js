import AuthService from '../services/authServices.js';

export const registerStudent = async (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    await AuthService.userSignUp(email, password);
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error in registerStudent:', error.message);

    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'Email already registered' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
