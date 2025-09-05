import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import client from "../api/client"; // axios client with baseURL + token

export default function BookAppointment() {
  const navigate = useNavigate();
  const loc = useLocation();

  const [form, setForm] = useState({
    dateTime: "",
    department: loc.state?.department || "",
    comments: "",
    reports: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // prevent past date/time (basic validation per guideline)
  const minLocal = useMemo(() => {
    const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    return now.toISOString().slice(0, 16);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.dateTime) e.dateTime = "Date & time is required";
    if (!form.department) e.department = "Please select doctor type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // safety: if somehow no token, show message (though PrivateRoute already guards)
    if (!localStorage.getItem("token")) {
      setToast("Please login again.");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("dateTime", new Date(form.dateTime).toISOString());
      fd.append("department", form.department);
      fd.append("comments", form.comments || "");
      for (const f of form.reports) fd.append("reports", f);

      await client.post("/api/appointments", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast("Appointment booked");
      setTimeout(() => navigate("/appointments"), 700);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to book appointment";
      setToast(msg);
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 1500);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-primary">Book an Appointment</h1>
      <p className="text-gray-600 mt-1">
        Choose your preferred date/time, doctor type and attach reports if any.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 bg-white rounded-2xl shadow p-6">
        {/* Date & Time */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date &amp; Time</label>
          <input
            type="datetime-local"
            min={minLocal}
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.dateTime}
            onChange={(e) => {
              setForm({ ...form, dateTime: e.target.value });
              setErrors((p) => ({ ...p, dateTime: undefined }));
            }}
            required
          />
          {errors.dateTime && <p className="text-red-600 text-sm mt-1">{errors.dateTime}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Type of Doctor</label>
          <select
            className="w-full rounded-md border border-gray-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.department}
            onChange={(e) => {
              setForm({ ...form, department: e.target.value });
              setErrors((p) => ({ ...p, department: undefined }));
            }}
            required
          >
            <option value="">Select</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Gynaecology</option>
            <option>Dentistry</option>
            <option>Orthopaedics</option>
            <option>General Physician</option>
            <option>Radiology</option>
            <option>Pathology</option>
            <option>Ayurveda</option>
          </select>
          {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Additional Comments</label>
          <textarea
            rows={4}
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Symptoms, past treatments, any notes…"
            value={form.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
          />
        </div>

        {/* Uploads */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Upload Reports</label>
          <input
            type="file"
            accept="application/pdf,image/*"
            multiple
            onChange={(e) => setForm({ ...form, reports: Array.from(e.target.files || []) })}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:bg-primary file:text-white
                       hover:file:bg-primary/90"
          />
          <p className="text-xs text-gray-500 mt-1">PDF/JPG/PNG — multiple files supported.</p>
        </div>

        <button
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-full shadow transition"
          aria-busy={loading}
        >
          {loading ? "Submitting…" : "Submit"}
        </button>

        {toast && (
          <div className="text-center text-sm mt-2">
            <span
              className={`inline-block px-3 py-1 rounded-full ${
                toast === "Appointment booked" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {toast}
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
