import { VacancyesDataType } from "../../../types/vacancys";
import { getVacancies, addVacancyInFavorite } from "./actions";
import { createSlice, SerializedError } from "@reduxjs/toolkit";

export type VacancyState = {
  entity: VacancyesDataType | null;
  isLoading: boolean;
  favoritePending: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  error: string | SerializedError | undefined;
};

const initialState: VacancyState = {
  entity: null,
  isLoading: false,
  favoritePending: null,
  searchQuery: "",
  currentPage: 1,
  totalPages: 0,
  error: undefined,
};

const VacancySlices = createSlice({
  name: "vacancySlice",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVacancies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getVacancies.fulfilled, (state, action) => {
      state.entity = action.payload.data;
      console.log(action.payload.data)
      state.totalPages = action.payload.data.totalPages;
      state.isLoading = false;
    });
    builder.addCase(getVacancies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    
    builder.addCase(addVacancyInFavorite.pending, (state, action) => {
      state.favoritePending = action.meta.arg;
    });
    builder.addCase(addVacancyInFavorite.fulfilled, (state, action) => {
      state.favoritePending = null;
      if (state.entity) {
        const index = state.entity.data.findIndex(
          (v) => v.id === action.meta.arg
        );
        if (
          index !== -1 &&
          state.entity.data[index] &&
          state.entity.data[index].isStarred !== undefined
        ) {
          state.entity.data[index].isStarred =
            !state.entity.data[index].isStarred;
        }
      }
    });
    builder.addCase(addVacancyInFavorite.rejected, (state, action) => {
      state.favoritePending = null;
    });
  },
});

export const vacancyActions = VacancySlices.actions;
export const vacancyReducers = VacancySlices.reducer;
