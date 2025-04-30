import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Project title
  tasks: [taskSchema], // Array of tasks
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
