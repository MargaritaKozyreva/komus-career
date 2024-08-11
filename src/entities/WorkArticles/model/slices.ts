import { WorkArticleDataType } from "../../../types/workArticle";
import { getWorkArticles } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type WorkArticlesState = {
  entity: WorkArticleDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: WorkArticlesState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const WorkArticlesSlices = createSlice({
  name: "WorkArticlesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkArticles.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getWorkArticles.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getWorkArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const workArticlesActions = WorkArticlesSlices.actions;
export const workArticlesReducers = WorkArticlesSlices.reducer;
