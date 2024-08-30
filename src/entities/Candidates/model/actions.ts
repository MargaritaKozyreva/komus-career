import { createAsyncThunk } from "@reduxjs/toolkit";
import { CandidatesContext } from "../../../api/dataContext";

export const getCandidates = createAsyncThunk(
  "candidates/getCandidates",
  async (searchQuery: string | undefined, { rejectWithValue }) => {
    try {
      const response = await CandidatesContext.getCandidates(searchQuery);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCandidateInFavorite = createAsyncThunk(
  "vacancySlice/addCandidateInFavorite",
  async (candidateId: string) => {
    const data = await CandidatesContext.addCandidateInFavorite({
      candidateId,
    });
    return data;
  }
);
