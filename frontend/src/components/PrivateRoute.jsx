import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((s) => s.auth); // null if not logged in
  const loc = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
