import { NewResumePersonalDataType } from "../../../../types/newResume";
import { addPersonalData } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type PersonalDataState = {
  entity: NewResumePersonalDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: PersonalDataState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const PersonalDataSlices = createSlice({
  name: "personalDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPersonalData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addPersonalData.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(addPersonalData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const personalDataActions = PersonalDataSlices.actions;
export const personalDataReducers = PersonalDataSlices.reducer;
