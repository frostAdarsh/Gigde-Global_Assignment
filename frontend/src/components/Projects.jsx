import React, { useEffect, useState } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaCheck } from "react-icons/fa";

const Projects = () => {
  const { fetchProjects, projects, isLoading, deleteProject, updateTask } =
    useProjectStore();

  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEditClick = (task, projectId) => {
    setEditingTask({ taskId: task._id, projectId });
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleSave = async () => {
    await updateTask(editingTask.projectId, editingTask.taskId, formData);
    setEditingTask(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="projects-container">
      <h1 className="projects-title">All Projects</h1>

      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="no-projects-text">No projects found.</p>
      ) : (
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <h2 className="project-title">{project.title}</h2>
                <div className="delete-icon">
                  <MdDelete onClick={() => deleteProject(project._id)} />
                </div>
              </div>

              <h3 className="task-heading">Tasks:</h3>
              {project.tasks?.length > 0 ? (
                <div className="task-list">
                  {project.tasks.map((task) => (
                    <div key={task._id} className="task-item">
                      {editingTask?.taskId === task._id ? (
                        <>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="task-input"
                            placeholder="Title"
                          />
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="task-textarea"
                            placeholder="Description"
                          />
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="task-select"
                          >
                            <option value="">Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                          <button className="save-btn" onClick={handleSave}>
                            <FaCheck /> Save
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="edit-icon">
                            <FaRegEdit
                              onClick={() => handleEditClick(task, project._id)}
                            />
                          </div>
                          <div>{task.title}</div>
                          <hr />
                          <div>{task.description}</div>
                          <div className="task-status">{task.status}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-tasks-text">No tasks in this project.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
