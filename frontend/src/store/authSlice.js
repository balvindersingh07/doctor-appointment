import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postJSON, getJSON } from "../services/api";

export const signupThunk = createAsyncThunk("auth/signup", async (payload) => {
  const data = await postJSON("/api/auth/signup", payload);
  return data;
});
export const loginThunk  = createAsyncThunk("auth/login",  async (payload) => {
  const data = await postJSON("/api/auth/login", payload);
  return data;
});
export const meThunk     = createAsyncThunk("auth/me",     async () => {
  const data = await getJSON("/api/auth/me");
  return data;
});

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    hydrate(state) {
      state.token = localStorage.getItem("token");
      state.user = JSON.parse(localStorage.getItem("user") || "null");
    }
  },
  extraReducers: (b) => {
    const start = (s)=>{ s.loading = true; s.error = null; };
    const fail  = (s,a)=>{ s.loading = false; s.error = a.error?.message || "Failed"; };

    b.addCase(signupThunk.pending, start);
    b.addCase(loginThunk.pending,  start);
    b.addCase(meThunk.pending,     start);

    b.addCase(signupThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.token = a.payload.token;
      s.user = a.payload.user;
      localStorage.setItem("token", a.payload.token);
      localStorage.setItem("user", JSON.stringify(a.payload.user));
    });
    b.addCase(loginThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.token = a.payload.token;
      s.user = a.payload.user;
      localStorage.setItem("token", a.payload.token);
      localStorage.setItem("user", JSON.stringify(a.payload.user));
    });
    b.addCase(meThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.user = a.payload.user;
      localStorage.setItem("user", JSON.stringify(a.payload.user));
    });

    b.addCase(signupThunk.rejected, fail);
    b.addCase(loginThunk.rejected,  fail);
    b.addCase(meThunk.rejected,     fail);
  }
});

export const { logout, hydrate } = slice.actions;
export default slice.reducer;
