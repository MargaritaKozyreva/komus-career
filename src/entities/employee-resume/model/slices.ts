import { EmployeeResumeType } from "../../../types/employeeResume";
import { getEmployeeResume } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type EmployeeResumeState = {
  entity: EmployeeResumeType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: EmployeeResumeState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const  EmployeeResumeSlices = createSlice({
  name: "employeeResumeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeResume.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployeeResume.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getEmployeeResume.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const employeeResumeActions = EmployeeResumeSlices.actions;
export const employeeResumeReducers = EmployeeResumeSlices.reducer;
