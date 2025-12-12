import { createSlice } from "@reduxjs/toolkit";
import {
  createMember,
  getMember,
  getAllMember,
  updateMember,
  deleteMember,
} from "../actions/memberAction";

const initialState = {
  members: [],
  member: null,
  status: "loading", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE Member
      .addCase(createMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members.push(action.payload);
      })
      .addCase(createMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to create member.";
      })

      // READ Single Member
      .addCase(getMember.pending, (state) => {
        state.status = "loading";
        state.member = null;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.member = action.payload;
      })
      .addCase(getMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch member.";
      })

      // READ All Members
      .addCase(getAllMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = action.payload;
        
      })
      .addCase(getAllMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch members.";
      })

      // UPDATE Member
      .addCase(updateMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = state.members.map((m) =>
          m.id === action.payload.id ? action.payload : m
        );
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to update member.";
      })

      // DELETE Member
      .addCase(deleteMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = state.members.filter((m) => m.id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to delete member.";
      });
  },
});

export default memberSlice.reducer;
