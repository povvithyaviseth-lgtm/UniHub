import express from "express";
import { adminData } from "../controllers/admin.controller.js";
import { getPendingClubRequests, setStatusForClub } from "../controllers/club.controller.js";

const router = express.Router();

router.get("/data", adminData);
router.get("/ClubRequests", getPendingClubRequests);
router.put("/ClubRequests/:id/status", setStatusForClub);
export default router;