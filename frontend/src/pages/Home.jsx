import React from "react";
import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-2 min-vh-100 shadow">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-md-10">
            <Navbar />
            <div className="row mt-4 mx-1">
              <div >
                <Projects/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
