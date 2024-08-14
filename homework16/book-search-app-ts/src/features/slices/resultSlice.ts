import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    // Add more fields as needed from the API response
  };
}

interface SearchResultsState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchResultsState = {
  books: [],
  isLoading: false,
  error: null,
};

export function getBooks(searchTerm: string) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
      dispatch(requestStarted());
      setTimeout(async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=0&maxResults=20`
          );
          const data = await response.json();
          console.log(data)
          dispatch(requestSucceed(data.items || []));
        } catch (error) {
              let errorMessage = "Failed to do something exceptional";
              if (error instanceof Error) {
                  errorMessage = error.message;
              }
              dispatch(requestFailed(errorMessage));
          }
      }, 2000);
    };
  }

export const resultSlice = createSlice({
  name: 'search-results',
  initialState,
  reducers: {
    requestStarted: (state) => {
      console.log('STARTED');
      state.isLoading = true;
      state.error = null;
    },
    requestSucceed: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.isLoading = false;
    },
    requestFailed: (state, action: PayloadAction<string>) => {
      console.log('FAILED');
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { requestStarted, requestSucceed, requestFailed } = resultSlice.actions;
export default resultSlice.reducer;


