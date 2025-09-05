import React from "react";
import BannerCarousel from "../components/BannerCarousel.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Patient Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your appointment system</p>
      </div>

      <BannerCarousel />

      <div className="bg-white rounded-2xl shadow p-6">
        <FAQAccordion />
      </div>
    </div>
  );
}
