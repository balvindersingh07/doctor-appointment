import React, { useMemo, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function formatDate(iso) {
  const d = new Date(iso);
  const day = d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return { day, time };
}

export default function MyAppointments() {
  const [items, setItems] = useState([]);
  const [year, setYear] = useState("all");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function fetchAppointments(selectedYear = "all") {
    setLoading(true);
    setErr("");
    try {
      const token = localStorage.getItem("token");
      const qs = selectedYear === "all" ? "" : `?year=${selectedYear}`;
      const res = await fetch(`${API_BASE}/api/appointments${qs}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.message || "Failed to load appointments";
        throw new Error(msg);
      }
      const data = await res.json();
      // ensure newest first
      data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      setItems(data);
    } catch (e) {
      setErr(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const years = useMemo(() => {
    const set = new Set(items.map((a) => new Date(a.dateTime).getFullYear()));
    return ["all", ...Array.from(set).sort((a, b) => b - a)];
  }, [items]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">My Appointments</h1>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y === "all" ? "All years" : y}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-600">Loading…</p>}
      {err && !loading && <p className="text-red-600 text-sm">{err}</p>}
      {!loading && !err && items.length === 0 && (
        <p className="text-gray-600">No appointments yet.</p>
      )}

      {!loading && !err && items.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((a) => {
            const { day, time } = formatDate(a.dateTime);
            const files = Array.isArray(a.reportFiles) ? a.reportFiles : [];
            return (
              <article
                key={a._id}
                className="overflow-hidden rounded-xl bg-white shadow border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                {/* Banner placeholder */}
                <div className="h-40 w-full bg-gradient-to-r from-primary/20 to-primary/10" />

                <div className="p-5 bg-primary/90 text-white flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-semibold">{day}</div>
                    <div className="opacity-90">{time}</div>
                  </div>
                </div>

                <div className="p-5 grid gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">Appointment Details</h3>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Department:</span> {a.department}
                    </p>
                    {a.comments ? (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Comments:</span> {a.comments}
                      </p>
                    ) : null}
                  </div>

                  {files.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-1">Reports</p>
                      <ul className="list-disc ml-5 space-y-1">
                        {files.map((f, idx) => {
                          const url = f.startsWith("http") ? f : `${API_BASE}${f}`;
                          return (
                            <li key={idx}>
                              <a
                                className="text-primary hover:underline text-sm break-all"
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {f.split("/").pop()}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
