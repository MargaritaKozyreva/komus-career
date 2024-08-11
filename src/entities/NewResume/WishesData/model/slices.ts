import { NewResumeWishesDataType } from "../../../../types/newResume";
import { addWishesData } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type WishesDataState = {
  entity: NewResumeWishesDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: WishesDataState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const WishesDataSlices = createSlice({
  name: "wishesDataSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addWishesData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addWishesData.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(addWishesData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const personalDataActions = WishesDataSlices.actions;
export const personalDataReducers = WishesDataSlices.reducer;
