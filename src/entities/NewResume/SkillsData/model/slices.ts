import { NewResumeSkillsDataType } from "../../../../types/newResume";
import { addSkillsData } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type SkillsDataState = {
  entity: NewResumeSkillsDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: SkillsDataState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const SkillsDataSlices = createSlice({
  name: "skillsDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSkillsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addSkillsData.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(addSkillsData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const skillsDataActions = SkillsDataSlices.actions;
export const skillsDataReducers = SkillsDataSlices.reducer;
