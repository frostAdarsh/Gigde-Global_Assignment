import express from "express";
import { createproject, deleteproject, getAllProjects } from "../controller/project.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/createproject",protectRoute,createproject) ;
router.delete("/deleteproject/:id",protectRoute,deleteproject) ;
router.get("/allprojects", protectRoute, getAllProjects);

export default router;