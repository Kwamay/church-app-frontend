// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "../actions/action";

// ---- Validate Stored Token ----
const accessToken = localStorage.getItem("accessToken");
const tokenExpiry = localStorage.getItem("tokenExpiry");

let isValid = false;
let savedUser = null;

if (accessToken && tokenExpiry) {
  if (Date.now() < Number(tokenExpiry)) {
    isValid = true;
    savedUser = JSON.parse(localStorage.getItem("user"));
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
  }
}

const initialState = {
  accessToken: isValid ? accessToken : null,
  user: isValid ? savedUser : null,
  isAuthenticated: isValid,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
    },
  },
  extraReducers: (builder) => {
    // ---------------- LOGIN ----------------
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;

      const token = action.payload.token;
      const user = action.payload.user;
      console.log(user);
      

      if (token) {
        state.accessToken = token;
        state.user = user;
        state.isAuthenticated = true;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tokenExpiry", Date.now() + 60 * 60 * 1000);
      }
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });

    // ---------------- REGISTER ----------------
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Registration failed";
    });

    // ---------------- LOGOUT (BACKEND) ----------------
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
    });

    builder.addCase(logoutUser.rejected, (state) => {
      // Even if backend fails, logout locally
      state.loading = false;
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
