import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../pages/Login";

const PublicRoute = ({ children }) => {
  const { user } = useAuthContext();

  return user ? <Navigate to="home" /> : children;
};

export default PublicRoute;
