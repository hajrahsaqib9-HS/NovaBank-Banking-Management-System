import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, role }) {
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const userRole = useSelector(
    (state) => state.auth.role
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;