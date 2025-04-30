import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar ">
        <div className="container-fluid p-2">
          <div>Welcome your name</div>
          <button className="btn btn-danger">Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
