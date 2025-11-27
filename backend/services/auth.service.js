import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';

class AuthService {
  static async #hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async #comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  }

  static async #checkUserExists(email) {
    return Student.findOne({ email });
  } 

  static #generateToken(userId) { 
    return jwt.sign(
      { id: userId }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  static async userSignUp(email, password) {
    const exists = await this.#checkUserExists(email);
    if (exists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.#hashPassword(password);
    const newUser = new Student({ email, password: hashedPassword });
    await newUser.save();
    return {
      message: "Signup successful. Please log in.", 
      user: {
        id: newUser._id, 
        email: newUser.email, 
        role: newUser.role,
      },
    };
  }

}
export default AuthService;


/* 
TODO: Change this into standalone functions
call them using AuthService.functionName

export async function signUp({ email, password }) {}
export async function login({ email, password }) {}
export async function adminLogin({ email, password }) {}
export async function logout({ userId, sessionId }) {}
export async function requestPasswordReset({ email }) {}
export async function resetPassword({ token, newPassword }) {}
export async function checkUserExists({ email }) {}
export async function hashPassword(plain) {}
export async function verifyPassword({ plain, hash }) {}

*/ 