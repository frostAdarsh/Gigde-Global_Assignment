import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth && !authUser) return <div>Loading...</div>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/register"
            element={!authUser ? <Register /> : <Navigate to="/" />}
          ></Route>
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </>
  );
};

export default App;
