import express from "express";
import { adminData } from "../controllers/admin.controller.js";
import { getPendingClubRequests, setStatusForClub, deleteClub } from "../controllers/club.controller.js";
import { getAllStudents, deleteStudent, updateStudentRole } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/data", adminData);
router.get("/ClubRequests", getPendingClubRequests);
router.get("/getStudents", getAllStudents);
router.put("/ClubRequests/:id/status", setStatusForClub);
router.delete("/deleteClub/:id", deleteClub);
router.delete("/deleteStudent/:id", deleteStudent);
router.put("/updateStudentRole/:id", updateStudentRole);
export default router;