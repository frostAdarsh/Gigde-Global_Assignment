import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import CreateProjectModal from "./CreateProjectModal";


const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ marginTop: "2rem", marginLeft: "2rem" }}>
      <h1 style={{ fontStyle: "italic", fontWeight: "300", fontSize: "1.5rem" }}>Task Work</h1>

      <div
        style={{
          marginTop: "2rem",
          marginLeft: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
       
      >
        <CiCirclePlus size={40} style={{ color: "green" }} onClick={() => setShowModal(true)}  />
      </div>

      { showModal && <CreateProjectModal closeModal={() => setShowModal(false)} />}

     
    </div>
  );
};

export default Sidebar;
