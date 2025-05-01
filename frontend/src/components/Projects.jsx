import React, { useEffect } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Projects = () => {
  const { fetchProjects, projects, isLoading, deleteProject, updateTask } =
    useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

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

              <h3 className="task-heading">Tasks:-</h3>
              {project.tasks?.length > 0 ? (
                <div className="task-list">
                  {project.tasks.map((task) => (
                    <div key={task._id} className="task-item">
                      <div className="edit-icon">
                        <FaRegEdit
                          onClick={() => updateTask(project._id, task._id)}
                        />
                      </div>

                      <div>{task.title}</div>
                      <hr />
                      <div>{task.description}</div>
                      <div className="task-status">{task.status}</div>
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
