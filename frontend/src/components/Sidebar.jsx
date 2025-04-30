import React from "react";
import { CiCirclePlus } from "react-icons/ci";
const Sidebar = () => {
  return (
    <div className="mt-5 mx-5">
      <h1 className="fs-4 fw-light fst-italic">Task Work</h1>
      <div
        className=" mt-5 mx-2 d-flex justify-content-center align-items-center"
        style={{ cursor: "pointer" }}
      >
        <CiCirclePlus
          size={40}
          className=" fw-bolder"
          style={{ color: "green" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
