import axios from "axios";

// If env missing in prod, fallback to your Render URL
const PROD_FALLBACK = "https://doctor-appointment-siv8.onrender.com";
const isVercelHost =
  typeof window !== "undefined" && /\.vercel\.app$/.test(window.location.hostname);

const API_BASE =
  (import.meta.env && import.meta.env.VITE_API_BASE_URL?.trim()) ||
  (isVercelHost ? PROD_FALLBACK : "http://localhost:5000");

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
