import express from "express";
import bcrypt from "bcryptjs";
import Student from "../models/Student.model.js"; // or User.model.js if you’re using that
const router = express.Router();

/*router.post("/signup", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});*/
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

/*router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
   console.log("Login attempt for:", email);
   
    const student = await Student.findOne({ email });
    if (!student || student.password !== password) {
      console.log("❌ Invalid credentials for:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const isMatched = await bcrypt.compare(password, student.password);
    if (!isMatched) {
      console.log("❌ Invalid credentials for:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    console.log("✅ Login successful for:", email);
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received from frontend:", req.body);
    console.log("Login attempt for:", email);

    // 1️⃣ Find the user
    const student = await Student.findOne({ email });
    if (!student) {
      console.log("❌ No user found for:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 2️⃣ Compare hashed password
    const isMatched = await bcrypt.compare(password, student.password);
    if (!isMatched) {
      console.log("❌ Password mismatch for:", email);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 3️⃣ Login success
    console.log("✅ Login successful for:", email);
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
})
export default router;

