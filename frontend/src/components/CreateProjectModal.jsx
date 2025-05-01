import React, { useState } from "react";
import { useProjectStore } from "../store/useProjectStore.js";

const CreateProjectModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([
    { title: "", description: "", status: "pending" },
  ]);

  const { createProject } = useProjectStore();

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTasks = [...tasks];
    updatedTasks[index][name] = value;
    setTasks(updatedTasks);
  };

  const addTaskField = () => {
    setTasks([...tasks, { title: "", description: "", status: "pending" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProject({ title, tasks });
    closeModal();
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={closeModal}>X</button>
        <h3>Create Project</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <hr />
          {tasks.map((task, index) => (
            <div key={index} className="taskInputs">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) => handleTaskChange(index, e)}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Task Description"
                value={task.description}
                onChange={(e) => handleTaskChange(index, e)}
                required
              />
              <select
                name="status"
                value={task.status}
                onChange={(e) => handleTaskChange(index, e)}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={addTaskField}>
            + Add Task
          </button>
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
