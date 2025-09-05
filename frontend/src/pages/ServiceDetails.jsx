import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";

const SERVICE_DATA = {
  "regular-healthcare-package": {
    title: "Regular Healthcare Package",
    subtitle: "Annual wellness & vitals",
    price: "₹1,499 – ₹2,999",
    includes: [
      "Doctor consultation (General Physician)",
      "Vitals: BP, BMI, Pulse, Temperature",
      "CBC, Fasting Blood Sugar, Lipid profile",
      "Urine routine",
      "ECG (if advised)",
    ],
    prep: [
      "Overnight fasting (8–10 hours) required for blood tests",
      "Carry previous medical records if any",
      "Avoid heavy exercise before the test",
    ],
    bookDept: "General Physician",
  },
  "ct-scan-x-ray": {
    title: "CT-Scan / X-Ray",
    subtitle: "Imaging & diagnostics",
    price: "₹700 – ₹5,000 (depending on area)",
    includes: [
      "Plain & Contrast CT scans",
      "Digital X-Ray (Chest, Limb, Spine etc.)",
      "Radiologist report within 24 hours",
    ],
    prep: [
      "Inform allergies to contrast dye, kidney issues or pregnancy",
      "Remove metal objects (jewelry, belt, coins) before scan",
      "Come 30 minutes early for formality",
    ],
    bookDept: "Radiology",
  },
  "lab-test": {
    title: "Lab Test",
    subtitle: "Blood, urine & more",
    price: "₹200 – ₹3,000",
    includes: [
      "CBC, Thyroid profile, LFT, KFT",
      "Diabetes panel (FBS/PP/ HbA1c)",
      "Urine routine & culture",
    ],
    prep: [
      "Some tests require fasting—follow instructions on booking",
      "Stay hydrated unless told otherwise",
    ],
    bookDept: "Pathology",
  },
  "gynae-health": {
    title: "Gynae Health",
    subtitle: "Women’s health services",
    price: "₹500 – ₹1,500 (consultation)",
    includes: [
      "Gynecologist consultation",
      "PCOS/PCOD screening",
      "Pap smear & ultrasound (if advised)",
    ],
    prep: [
      "Avoid scheduling Pap smear during menstruation",
      "Carry list of current medications",
    ],
    bookDept: "Gynaecology",
  },
  "ayurveda-treatment": {
    title: "Ayurveda Treatment",
    subtitle: "Holistic & herbal care",
    price: "₹800 – ₹3,500",
    includes: [
      "Ayurvedic consultation (Prakriti analysis)",
      "Panchakarma therapies (as required)",
      "Diet & lifestyle plan",
    ],
    prep: [
      "Inform if you are on blood thinners or have skin conditions",
      "Loose, comfortable clothing recommended",
    ],
    bookDept: "Ayurveda",
  },
  "dental-checkup": {
    title: "Dental Checkup",
    subtitle: "Cleaning & consultation",
    price: "₹400 – ₹1,200",
    includes: [
      "Oral examination",
      "Scaling & polishing",
      "X-ray(s) if needed + treatment plan",
    ],
    prep: ["Brush gently before visit", "Inform sensitivity or bleeding gums"],
    bookDept: "Dentistry",
  },
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const data = SERVICE_DATA[slug];

  if (!data) return <Navigate to="/services" replace />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/services" className="text-primary hover:underline">
          &larr; Back to Services
        </Link>
        <h1 className="text-3xl font-bold mt-2 text-primary">{data.title}</h1>
        <p className="text-gray-600">{data.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-6">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2">
            <h2 className="font-semibold text-lg mb-2">What’s included</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {data.includes.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="sm:border-l sm:pl-6">
            <h2 className="font-semibold text-lg mb-2">Price range</h2>
            <p className="text-gray-700">{data.price}</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">Preparation</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {data.prep.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <Link
            to="/book"
            state={{ department: data.bookDept }}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition"
          >
            Book this service
          </Link>
        </div>
      </div>
    </div>
  );
}
