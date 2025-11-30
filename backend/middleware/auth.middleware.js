// middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';

    // Expect: "Authorization: Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token using the same secret as in AuthService.#generateToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional but nice: check that the user still exists
    const student = await Student.findById(decoded.id).select('-password');
    if (!student) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to the request for downstream controllers
    req.user = {
      id: student._id.toString(),
      email: student.email,
      role: student.role,
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
