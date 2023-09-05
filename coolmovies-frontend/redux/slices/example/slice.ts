import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  value: number;
  sideEffectCount: number;
  fetchData?: unknown[];
  moviesList?: unknown[];
  currentUser: unknown[];
}

const initialState: ExampleState = {
  value: 0,
  sideEffectCount: 0
};

export const slice = createSlice({
  initialState,
  name: 'example',
  reducers: {
    fetch: () => {},
    fetchMovies: () => {},
    fetchCurrentUser: () => {},
    changeData: (state, action) => {},
    addReviewData: (state, action) => {},
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: unknown[] }>) => {
      
      state.fetchData = action.payload.data;
    },
    loadedMovies: (state, action: PayloadAction<{ data: unknown[] }>) => {
      
      state.moviesList = action.payload.data;
    },
    loadedUser: (state, action: PayloadAction<{ data: any }>) => {
      
      state.currentUser = action.payload.data;
    },
    loadError: (state) => {
      state.fetchData = ['Error Fetching :('];
    },
    increment: (state) => {
      state.value += 1;
    },
    epicSideEffect: (state) => {
      state.sideEffectCount += 1;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
