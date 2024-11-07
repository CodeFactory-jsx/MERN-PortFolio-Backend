import express from "express";
import {
  addNewApplication,
  deleteApplication,
  getAllApplications,
} from "../Controller/softwareApplicaitonController.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/getall", getAllApplications);

export default router;
