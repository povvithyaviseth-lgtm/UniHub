import bcrypt from 'bcryptjs';
import Student from '../models/studentModels.js';

class AuthService {
  static async #hashPassword(password) {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  }

  static async #checkUserExists(email) {
    const user = await Student.findOne({ email });
    return !!user;
  }

  static async userSignUp(email, password) {
    const exists = await this.#checkUserExists(email);
    if (exists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.#hashPassword(password);
    const newUser = new Student({ email, password: hashedPassword });
    await newUser.save();
    return true;
  }

  
}

export default AuthService;


    /*  othere static functions we can implement ->
    static async userLogin(username, password) {}
    static async userLogout() {} 
    static async forgetPassword(email) {}
    static async updatePassword(email, newPassword) {}
    */ 
