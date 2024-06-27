import React from "react";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Home /> : <Navigate to="/login" />;
};

export default PrivateRoute;
