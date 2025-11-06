// src/redux/asyncActions/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/login";

// Login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("login/", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Register action
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ first_name, last_name, password, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("register/", {
        first_name,
        last_name,
        password,
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
