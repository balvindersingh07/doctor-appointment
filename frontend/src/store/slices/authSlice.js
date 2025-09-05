import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client"; // uses VITE_API_BASE_URL

const API = "/api/auth";

// Read any persisted auth (so refresh pe logged-in rahe)
const savedToken = localStorage.getItem("token") || null;
const savedUser = (() => {
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
})();

// SIGNUP
export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`${API}/register`, payload);
      return data; // expect { token, user }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Registration failed";
      return rejectWithValue(msg);
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await client.post(`${API}/login`, payload);
      return data; // expect { token, user }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser, token: savedToken, loading: false, error: null },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload?.user || null;
        s.token = payload?.token || null;
        if (payload?.token) localStorage.setItem("token", payload.token);
        if (payload?.user) localStorage.setItem("user", JSON.stringify(payload.user));
      })
      .addCase(register.rejected, (s, { payload, error }) => {
        s.loading = false;
        s.error = payload || error.message || "Registration failed";
      })
      // login
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload?.user || null;
        s.token = payload?.token || null;
        if (payload?.token) localStorage.setItem("token", payload.token);
        if (payload?.user) localStorage.setItem("user", JSON.stringify(payload.user));
      })
      .addCase(login.rejected, (s, { payload, error }) => {
        s.loading = false;
        s.error = payload || error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
