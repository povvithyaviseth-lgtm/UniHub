import bcrypt from 'bcryptjs';
import Student from '../models/student.model.js';

class AuthService {

  static async #hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async #checkUserExists(email) {
    const user = await Student.findOne({ email });
    return !!user;
  }

  // SIGNUP
  static async userSignUp(email, password) {
    const exists = await this.#checkUserExists(email);
    if (exists) throw new Error('User already exists');

    const hashedPassword = await this.#hashPassword(password);
    const newUser = new Student({ email, password: hashedPassword });
    await newUser.save();
    return true;
  }

  // ⭐ LOGIN
  static async userLogin(email, password) {
    const student = await Student.findOne({ email });
    if (!student) return null;

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return null;

    return student;  // return student object if login successful
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