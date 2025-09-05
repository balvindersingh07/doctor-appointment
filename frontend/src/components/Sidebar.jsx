// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar({ open, onClose }) {
  const { user } = useSelector((s) => s.auth);

  const item = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "text-gray-800 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 md:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed md:static top-14 md:top-0 left-0 h-[calc(100vh-3.5rem)] md:h-auto w-64 
        bg-white border-r shadow-md md:shadow-none overflow-y-auto
        transition-transform z-30 md:z-auto 
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt="profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user?.name || "Patient"}</p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-2">
          <NavLink to="/profile" end className={item}>
            Patient
          </NavLink>
          <NavLink to="/book" className={item}>
            Book Appointment
          </NavLink>
          <NavLink to="/appointments" className={item}>
            My Appointments
          </NavLink>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
