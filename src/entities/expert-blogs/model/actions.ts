import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExpertBlogsContext } from "../../../api/dataContext";

export const getExpertBlogs = createAsyncThunk(
  "expertBlogsSlice/getExpertBlogs",
  async () => {
    const data = await ExpertBlogsContext.getExpertBlogs();
    return data;
  }
);
