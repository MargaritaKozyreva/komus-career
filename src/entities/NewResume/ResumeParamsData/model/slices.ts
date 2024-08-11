import { NewResumeParamsDataType } from "../../../../types/newResume";
import { addParamsData } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type ParamsDataState = {
  entity: NewResumeParamsDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: ParamsDataState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const ParamsDataSlices = createSlice({
  name: "paramsDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addParamsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addParamsData.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(addParamsData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const paramsDataActions = ParamsDataSlices.actions;
export const paramsDataReducers = ParamsDataSlices.reducer;
