import { CandidateType } from "../../../types/candidates";
import { getCandidates, addCandidateInFavorite } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type CandidatesState = {
  entity: CandidateType[] | null;
  isLoading: boolean;
  favoritePending: string | null;
  error: string | SerializedError | undefined;
};

const initialState: CandidatesState = {
  entity: null,
  isLoading: false,
  favoritePending: null,
  error: undefined,
};

const CandidatesSlices = createSlice({
  name: "candidatesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCandidates.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCandidates.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getCandidates.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addCandidateInFavorite.pending, (state, action) => {
      state.favoritePending = action.meta.arg;
    });
    builder.addCase(addCandidateInFavorite.fulfilled, (state, action) => {
      state.favoritePending = null;
      if (state.entity) {
        console.log(state.entity)
        const index = state.entity.findIndex((v) => v.id === action.meta.arg);
        if (
          index !== -1 &&
          state.entity[index] &&
          state.entity[index].isStarred !== undefined
        ) {
          state.entity[index].isStarred = !state.entity[index].isStarred;
        }
      }
    });
    builder.addCase(addCandidateInFavorite.rejected, (state, action) => {
      state.favoritePending = null;
    });
  },
});

export const candidatesActions = CandidatesSlices.actions;
export const candidatesReducers = CandidatesSlices.reducer;
