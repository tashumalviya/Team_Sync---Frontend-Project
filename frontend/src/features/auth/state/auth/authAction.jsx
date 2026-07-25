import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

// Login
export const loginEmployee = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);

      // JWT Token save
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Current Logged In User
export const currentLoggedEmployee = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);