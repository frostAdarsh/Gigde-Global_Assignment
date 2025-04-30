import express from "express";

import {
  createProject,
  getAllProjects,
  deleteProject,
  updateTask,
  addTaskToProject,
} from "../controller/project.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes
router.post("/", protectRoute, createProject);
router.get("/", protectRoute, getAllProjects);
router.delete("/:id", protectRoute, deleteProject);

router.post("/:projectId/tasks", protectRoute, addTaskToProject);


router.put("/:projectId/tasks/:taskId", protectRoute, updateTask);


export default router;
