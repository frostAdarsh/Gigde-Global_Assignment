import Project from "../models/project.model.js";

export const createproject = async (req, res) => {
  try {
    const user = req.user;
    const { title } = req.body;

    if (!title) {
      return res
        .status(303)
        .json({ success: false, message: "Title is required" });
    }
    const newProject = new Project({
      title,
      user: user._id,
    });
    await newProject.save();
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      newProject,
    });
  } catch (error) {
    colsole.log("Error in createproject controller", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteproject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const user = req.user;

    const project = await Project.findOne({ _id: projectId, user: user._id });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    await project.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in deleteproject controller:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllProjects = async (req, res) => {
    try {
      const user = req.user;
  
      const projects = await Project.find({ user: user._id }).sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        projects,
      });
    } catch (error) {
      console.log("Error in getAllProjects controller:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };