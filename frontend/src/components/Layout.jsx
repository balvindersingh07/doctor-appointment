// src/components/Layout.jsx
import React, { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffaf0]">
      <Header onMenu={() => setOpen(true)} />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        {/* Nested routes render here */}
        <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
