// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Dashboard from "./pages/Dashboard.jsx";      // optional (if you still use it)
import Services from "./pages/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";          // <-- add

// wrappers
import PrivateRoute from "./components/PrivateRoute.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  return (
    <Routes>
      {/* public/auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* redirect "/" -> "/profile" so login ke baad ye open ho */}
        <Route index element={<Navigate to="/profile" replace />} />
        <Route path="profile" element={<Profile />} />          {/* <-- protected profile */}
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetails />} />
        <Route path="book" element={<BookAppointment />} />
        <Route path="appointments" element={<MyAppointments />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
