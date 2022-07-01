import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  allStaffMembers: [],
  allDepartmentMembers: [],
  allStaffLeaves: [],
  staffSalaries: [],
  allStaffSalaries: [],
  staffLeave: [],
  loggedinStaff: {},
  leaveRequest: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getLogginUserDetails(state, action) {
      state.loggedinStaff = action.payload;
    },
    getAllStaffMembers(state, action) {
      state.allStaffMembers = action.payload;
    },
    getLogginStaffId(state, action) {
      state.userId = action.payload;
    },
    getAllSalaries(state, action) {
      state.allStaffSalaries = action.payload;
    },
    getAllLeaves(state, action) {
      state.allStaffLeaves = action.payload;
    },
  },
});

export const { getLogginUserDetails, getAllStaffMembers, getLogginStaffId } =
  userSlice.actions;
export default userSlice.reducer;
