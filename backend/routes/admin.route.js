import express from "express";
import { adminData } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/data", adminData);
export default router;