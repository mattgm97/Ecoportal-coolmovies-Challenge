import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  fetchData?: unknown[];
  moviesList?: unknown[];
  currentUser?: unknown[];
}

const initialState: ExampleState = {
  moviesList: [],
  currentUser: []
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
    }
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
