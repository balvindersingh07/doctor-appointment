import React, { useEffect, useState } from "react";

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", photo: null, preview: "" });

  useEffect(() => {
    // Prefill from current user (stored by auth flow)
    const raw = localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      setForm((p) => ({
        ...p,
        name: u.name || "",
        email: u.email || "",
        phone: u.phone || ""
      }));
    }
  }, []);

  const onPhoto = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, photo: file, preview: url }));
  };

  const onSave = (e) => {
    e.preventDefault();
    // Local-only profile save (guideline: patient details shown; backend avatar not required)
    const raw = localStorage.getItem("user");
    const u = raw ? JSON.parse(raw) : {};
    u.name = form.name;
    u.phone = form.phone;
    u.email = form.email; // save email as well
    localStorage.setItem("user", JSON.stringify(u));
    alert("Profile saved");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">My Profile</h1>
      <form onSubmit={onSave} className="mt-6 bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 border">
            {form.preview ? <img src={form.preview} alt="avatar" className="h-full w-full object-cover" /> : null}
          </div>
          <label className="inline-block">
            <span className="px-3 py-2 rounded-full bg-primary text-white text-sm cursor-pointer hover:bg-primary/90">
              Upload Photo
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
          </label>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            className="w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-full shadow transition">
          Save
        </button>
      </form>
    </div>
  );
}
