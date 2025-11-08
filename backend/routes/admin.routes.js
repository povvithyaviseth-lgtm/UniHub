import express from "express";
import { adminData } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/data", adminData);
export default router;