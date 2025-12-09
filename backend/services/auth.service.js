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

/* 
How Login Tokens Work 

When a user logs in, the server needs a way to know who they are.

HTTP is stateless, meaning:
Every request is treated like a brand-new stranger

The server does not remember past requests automatically
So we need something that lets the server remember:
"This request was made by Student #123."

A token is just a long string that proves who the user is.

The token is created when the student logs in and is stored in the browser’s localStorage.
When the user makes a request, the middleware verifies the token and extracts the user ID from it, 
so the server knows exactly which student is making the request.
*/ 

  static #generateToken(userId) { 
    return jwt.sign(
      { id: userId }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  static async studentSignUp(email, password) {
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

  static async userSignUp(email, password) {
    return this.studentSignUp(email, password);
  }

  static async studentLogin(email, password) {
    const user = await this.#checkUserExists(email); 
    if (!user) {
      throw new Error("Invalid email"); 
    }

    const passwordMatch = await this.#comparePassword(password, user.password); 
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = this.#generateToken(user._id); 

    return {
      message: "Login successful", 
      token,
      user: {
        id: user._id, 
        email: user.email,
        role: user.role,
      },
    };
  }
}
export default AuthService;


/* 
export async function adminLogin({ email, password }) {}
export async function logout({ userId, sessionId }) {}
export async function requestPasswordReset({ email }) {}
export async function resetPassword({ token, newPassword }) {}
*/ 