import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/login";

// CREATE: Add a new member
export const createMember = createAsyncThunk(
  "member/createMember",
  async (formData, { rejectWithValue }) => {
    try {
      
      const {
        first_name,
        surname,
        email,
        phone_number,
        year_joined,
        membership,
        gender,
        marital_status,
        date,
        resident_address,
        sub_ministry,
        profilePicture,
      } = formData;

      const memberData = new FormData();
      memberData.append("first_name", first_name);
      memberData.append("surname", surname);
      memberData.append("email", email);
      memberData.append("phone_number", phone_number);
      memberData.append("year_joined", year_joined);
      memberData.append("membership", membership);
      memberData.append("gender", gender);
      memberData.append("marital_status", marital_status);
      memberData.append("date", date);
      memberData.append("resident_address", resident_address);
      memberData.append("sub_ministry", sub_ministry);

      if (profilePicture) {
        memberData.append("profile_picture", profilePicture);
      }

      for (let pair of memberData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post("members/", memberData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create member");
    }
  }
);

// READ: Get a single member by ID
export const getMember = createAsyncThunk(
  "member/getMember",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`members/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch member");
    }
  }
);
export const getAllMember = createAsyncThunk(
  "member/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("members/"); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching members");
    }
  }
);

// UPDATE: Update a member's details
export const updateMember = createAsyncThunk(
  "member/updateMember",
  async (
    {
      id,
      first_name,
      surname,
      email,
      phone_number,
      year_joined,
      membership,
      marital_status,
      gender,
      date,
      resident_address,
      sub_ministry,
      profile_picture, 
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("surname", surname);
      formData.append("email", email);
      formData.append("phone_number", phone_number);
      formData.append("year_joined", year_joined);
      formData.append("membership", membership);
      formData.append("marital_status", marital_status);
      formData.append("gender", gender);
      formData.append("date", date);
      formData.append("resident_address", resident_address);
      formData.append("sub_ministry", sub_ministry);

      if (profile_picture instanceof File) {
        formData.append("profile_picture", profile_picture);
      }

      const response = await axios.patch(`members/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update member");
    }
  }
);

// DELETE: Remove a member
export const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`members/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete member");
    }
  }
);
