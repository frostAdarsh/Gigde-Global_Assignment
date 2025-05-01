import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useProjectStore = create((set, get) => ({
  projects: [],
  isLoading: false,

  // Fetch all projects
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/projects/");
      set({ projects: res.data.projects });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a project with tasks
  createProject: async (projectData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/projects/", projectData);
      set((state) => ({ projects: [res.data.project, ...state.projects] }));
      toast.success("Project created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create project");
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete a project
  deleteProject: async (projectId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/projects/${projectId}`);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== projectId),
      }));
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete project");
    } finally {
      set({ isLoading: false });
    }
  },

  // Add task to a project
  addTaskToProject: async (projectId, taskData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/projects/${projectId}/tasks`, taskData);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === projectId ? res.data.project : p
        ),
      }));
      toast.success("Task added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add task");
    } finally {
      set({ isLoading: false });
    }
  },

  // Update a task inside a project
  updateTask: async (projectId, taskId, updateData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/projects/${projectId}/tasks/${taskId}`, updateData);
      set((state) => ({
        projects: state.projects.map((project) => {
          if (project._id === projectId) {
            const updatedTasks = project.tasks.map((task) =>
              task._id === taskId ? res.data.task : task
            );
            return { ...project, tasks: updatedTasks };
          }
          return project;
        }),
      }));
      toast.success("Task updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    } finally {
      set({ isLoading: false });
    }
  },
}));
