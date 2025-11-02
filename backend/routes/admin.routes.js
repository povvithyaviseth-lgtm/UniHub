import express from "express";

import { login } from "../controller/admin.controller.js";

const router = express.Router();

router.use("/login", login);

export default router;
