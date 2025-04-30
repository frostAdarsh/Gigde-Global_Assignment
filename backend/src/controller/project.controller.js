import Project from "../models/project.model.js";

// Create a project with tasks
export const createProject = async (req, res) => {
  try {
    const { title, tasks } = req.body;
    const user = req.user;

    if (!title || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "Title and at least one task are required" });
    }

    const newProject = new Project({
      title,
      tasks,
      user: user._id,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.log("Error in createProject:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all projects for a user
export const getAllProjects = async (req, res) => {
  try {
    const user = req.user;

    const projects = await Project.find({ user: user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log("Error in getAllProjects:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const user = req.user;

    const project = await Project.findOne({ _id: projectId, user: user._id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProject:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addTaskToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;
    const user = req.user;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = await Project.findOne({ _id: projectId, user: user._id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Push new task to the tasks array
    project.tasks.push({
      title,
      description,
      status: status || "pending",
      createdAt: new Date(),
      completedAt: status === "completed" ? new Date() : null,
    });

    await project.save();

    res.status(200).json({
      success: true,
      message: "Task added to project successfully",
      project,
    });
  } catch (error) {
    console.log("Error in addTaskToProject:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { title, description, status } = req.body;
    const user = req.user;

    const project = await Project.findOne({ _id: projectId, user: user._id });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      task.status = status;
      if (status === "completed") {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.log("Error in updateTask:", error.message);
    res.status(500).json({ message: error.message });
  }
};
