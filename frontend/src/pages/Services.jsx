import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await client.get("/api/services");
        setServices(data || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Services</h1>
        <p className="text-gray-600">Hospital offerings</p>
      </div>

      {loading && <p className="text-gray-600">Loading…</p>}
      {err && !loading && <p className="text-red-600 text-sm">{err}</p>}

      {!loading && !err && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article key={s._id || s.title} className="rounded-xl border border-gray-100 bg-white shadow hover:shadow-md transition">
              <div className="p-5">
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                {s.description && <p className="text-sm text-gray-600 mt-1">{s.description}</p>}
                <div className="mt-4">
                  <Link
                    to="/book"
                    state={{ department: s.title }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition"
                  >
                    Book now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
