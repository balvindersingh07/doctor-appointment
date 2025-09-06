import axios from "axios";

// prefer env; fallback based on host
const PROD_FALLBACK = "https://doctor-appointment-siv8.onrender.com";
const isVercel =
  typeof window !== "undefined" && /\.vercel\.app$/.test(window.location.hostname);

const RAW = (import.meta.env?.VITE_API_BASE_URL || "").trim();
const API_BASE = (RAW || (isVercel ? PROD_FALLBACK : "http://localhost:5000")).replace(/\/+$/, "");

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// optional: clear token on 401 so user re-logs
client.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default client;
