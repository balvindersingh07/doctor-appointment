export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function postJSON(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({})))?.message || `HTTP ${res.status}`);
  return res.json();
}

export async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { ...authHeader() }});
  if (!res.ok) throw new Error((await res.json().catch(()=>({})))?.message || `HTTP ${res.status}`);
  return res.json();
}
