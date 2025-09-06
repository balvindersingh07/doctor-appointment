import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import Toast from "../components/Toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ msg: "", type: "success" });

  function validate() {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.password) e.password = "Password required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    try {
      const res = await dispatch(login({ email: form.email, password: form.password })).unwrap();

      // ALWAYS persist auth for axios client
      if (res?.token) {
        localStorage.setItem("token", res.token);
        sessionStorage.setItem("token", res.token);
      }
      if (res?.user) localStorage.setItem("user", JSON.stringify(res.user));
      else localStorage.setItem("user", JSON.stringify({ name: "Patient", email: form.email }));

      setToast({ msg: "Login successful", type: "success" });
      setTimeout(() => navigate("/profile", { replace: true }), 800);
    } catch (err) {
      setErrors((p) => ({ ...p, submit: err?.message || "Login failed" }));
    }
  }

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary text-white px-6 py-5 flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2"><HiOutlineDesktopComputer size={28} /></div>
          <div className="text-lg font-semibold">Patient System</div>
        </div>

        <div className="px-6 py-6">
          <h1 className="text-xl font-bold text-gray-800">
            Login <span className="font-medium text-gray-600">to your Account</span>
          </h1>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Remember me
            </label>

            <button disabled={loading} className="w-full bg-primary hover:bg-primaryDark text-white font-semibold py-2 rounded-full shadow transition">
              {loading ? "Please wait..." : "LOGIN"}
            </button>
            {errors.submit && <p className="text-red-600 text-sm text-center">{errors.submit}</p>}
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            New here? <Link to="/signup" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </div>
      </div>

      <Toast message={toast.msg} type={toast.type} />
    </div>
  );
}
