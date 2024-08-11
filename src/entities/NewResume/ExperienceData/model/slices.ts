import { NewResumeExperienceDataType } from "../../../../types/newResume";
import { addExperienceData } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type ExperienceDataState = {
  entity: NewResumeExperienceDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: ExperienceDataState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const ExperienceDataSlices = createSlice({
  name: "experienceDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addExperienceData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addExperienceData.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(addExperienceData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const experienceDataActions = ExperienceDataSlices.actions;
export const experienceDataReducers = ExperienceDataSlices.reducer;
