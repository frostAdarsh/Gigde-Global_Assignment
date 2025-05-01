import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const {authUser,logout} = useAuthStore()
  return (
    <div>
      <nav className="navbar ">
        <div className="container-fluid p-2">
          <div style={{textDecoration:"underline",fontSize:"30px"}}>Welcome {authUser?.FullName}</div>
          <button onClick={logout} className="btn btn-danger">Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
