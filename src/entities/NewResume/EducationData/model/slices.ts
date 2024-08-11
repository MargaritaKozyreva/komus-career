
import { NewResumeEducationDataType } from "../../../../types/newResume";
import { addEducationData } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type EducationDataState = {
  entity: NewResumeEducationDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: EducationDataState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const EducationDataSlices = createSlice({
  name: "educationDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEducationData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addEducationData.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(addEducationData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const educationDataActions = EducationDataSlices.actions;
export const educationDataReducers = EducationDataSlices.reducer;
