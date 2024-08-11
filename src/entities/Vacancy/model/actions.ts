import { createAsyncThunk } from "@reduxjs/toolkit";
import { VacancyContext } from "../../../api/dataContext";

export const getVacancies = createAsyncThunk(
  "vacancySlice/getVacancies",
  async (payload: { page?: number; limit?: number; query?: string }) => {
    const data = await VacancyContext.getVacancies(payload);
    return data;
  }
);
export const addVacancyInFavorite = createAsyncThunk(
  "vacancySlice/addVacancyInFavorite",
  async (vacancyId: string) => {
    const data = await VacancyContext.addVacancyInFavorite({ vacancyId });
    return data;
  }
);
