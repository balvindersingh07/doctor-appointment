import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import logo from "../assets/logo.svg";

export default function Header({ onMenu }) {
  const pill = ({ isActive }) =>
    `px-3 py-1 rounded-full text-sm transition ${
      isActive ? "bg-white text-primary" : "text-white hover:bg-white/10"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-primary text-white shadow">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="md:hidden p-2 rounded hover:bg-white/10"
            aria-label="Open menu"
          >
            <HiBars3 size={22} />
          </button>
          <Link to="/" className="font-bold tracking-wide flex items-center gap-2">
            <img src={logo} alt="logo" className="h-6 w-6" />
            Patient System
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/services" className={pill}>Services</NavLink>
          <NavLink to="/book" className={pill}>Book an appointment</NavLink>
          <NavLink to="/appointments" className={pill}>My appointments</NavLink>
        </nav>
      </div>
    </header>
  );
}
