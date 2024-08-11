import { ExpertBlogType, ExpertBlogDataType } from "../../../types/expertBlog";
import { getExpertBlogs } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type ExpertBlogsState = {
  entity: ExpertBlogDataType | null;
  isLoading: boolean;
  error: string | SerializedError | undefined;
};

const initialState: ExpertBlogsState = {
  entity: null,
  isLoading: false,
  error: undefined,
};

const ExpertBlogsSlices = createSlice({
  name: "ExpertBlogsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExpertBlogs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getExpertBlogs.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getExpertBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const expertBlogsActions = ExpertBlogsSlices.actions;
export const expertBlogsReducers = ExpertBlogsSlices.reducer;
