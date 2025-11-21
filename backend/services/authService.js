
/*import bcrypt from 'bcryptjs';
import Student from '../models/Student.model.js';
//import { create } from 'zustand';
//import { adminLogin } from './adminLoginFunction';
//import { studentLogin } from './student';

export const authentication = create((set) => ({
  login: async (credentials) => {
    if (credentials.isAdmin) {
      return adminLogin(credentials);
    } else {
      return studentLogin(credentials);
    }
  }
}));
*/
import bcrypt from "bcryptjs";
import Student from "../models/Student.model.js";


class AuthService {
  // 🔒 private helper: hash password
  static async #hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // 🔍 private helper: check if user exists
  static async #checkUserExists(email) {
    const user = await Student.findOne({ email });
    return !!user;
  }

  // 🧩 public: sign up new student
  static async userSignUp(email, password) {
    const exists = await this.#checkUserExists(email);
    if (exists) throw new Error("User already exists");

    const hashedPassword = await this.#hashPassword(password);
    const newUser = new Student({ email, password: hashedPassword });
    await newUser.save();

    return true;
  }

  // 🧠 future methods (stubs)
  /*
  static async userLogin(email, password) {}
  static async userLogout() {}
  static async forgetPassword(email) {}
  static async updatePassword(email, newPassword) {}
  */
}

export default AuthService;