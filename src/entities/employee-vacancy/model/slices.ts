import { EmployeeVacancyDataType } from "../../../types/vacancys";
import { getEmployeeVacancyResponses } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type EmployeeVacancyState = {
  entity: EmployeeVacancyDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: EmployeeVacancyState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const  EmployeeVacancySlices = createSlice({
  name: "employeeVacancySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeVacancyResponses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployeeVacancyResponses.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getEmployeeVacancyResponses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const employeeVacancyActions = EmployeeVacancySlices.actions;
export const employeeVacancyReducers = EmployeeVacancySlices.reducer;
