// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Dashboard from "./pages/Dashboard.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx"; // NEW

// wrappers
import PrivateRoute from "./components/PrivateRoute.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  return (
    <Routes>
      {/* public/auth pages (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected area (Layout + auth) */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* default after login = Profile (guideline) */}
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />

        {/* keep dashboard accessible */}
        <Route path="dashboard" element={<Dashboard />} />

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
