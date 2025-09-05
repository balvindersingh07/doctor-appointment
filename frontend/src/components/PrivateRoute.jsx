import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Allow if token exists in Redux OR localStorage
  const reduxToken = useSelector((s) => s.auth?.token);
  const lsToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const token = reduxToken || lsToken;

  const location = useLocation();

  if (!token) {
    // no token -> send to login, remember where user wanted to go
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
