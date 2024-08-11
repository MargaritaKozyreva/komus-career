import { createAsyncThunk } from "@reduxjs/toolkit";
import { WorkArticlesContext } from "../../../api/dataContext";

export const getWorkArticles = createAsyncThunk(
  "workArticlesSlice/getWorkArticles",
  async () => {
    const data = await WorkArticlesContext.getWorkArticles()
    return data;
  }
);
