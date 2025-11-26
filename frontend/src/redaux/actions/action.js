// src/redux/actions/action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/login";

// ---------------------- LOGIN ----------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("login/", { email, password });
      console.log(response);
      
      return response.data.data; // your slice handles storage
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// ---------------------- REGISTER ----------------------
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
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// ---------------------- LOGOUT ----------------------
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      // Call backend logout if token exists
      const response = await axios.get(
        "logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      // Even if server logout fails → still logout locally
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);
