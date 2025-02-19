import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get JWT token from localStorage

  if (!token) {
    return <Navigate to="/auth" />; // Redirect to login if token doesn't exist
  }

  return children; // Allow access if token exists
};

export default ProtectedRoute;
