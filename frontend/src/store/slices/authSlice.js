import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth"; // apna backend port update kar le

// signup
export const register = createAsyncThunk("auth/register", async(userData)=>{
  const res = await axios.post(`${API}/register`, userData);
  return res.data;
});

// login
export const login = createAsyncThunk("auth/login", async(userData)=>{
  const res = await axios.post(`${API}/login`, userData);
  return res.data;
});

const authSlice = createSlice({
  name:"auth",
  initialState:{ user:null, token:null, loading:false, error:null },
  reducers:{
    logout:(state)=>{
      state.user=null;
      state.token=null;
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(register.pending, (s)=>{s.loading=true;})
      .addCase(register.fulfilled, (s,a)=>{s.loading=false; s.user=a.payload.user; s.token=a.payload.token;})
      .addCase(register.rejected, (s,a)=>{s.loading=false; s.error=a.error.message;})
      .addCase(login.pending, (s)=>{s.loading=true;})
      .addCase(login.fulfilled, (s,a)=>{s.loading=false; s.user=a.payload.user; s.token=a.payload.token;})
      .addCase(login.rejected, (s,a)=>{s.loading=false; s.error=a.error.message;});
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
