import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: string;
  title: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

interface Book {
    id: string;
    volumeInfo: any
}

const initialState: WishlistState = {
  wishlist: []
};


export function addtoWishlist(bookId: string) {
    return async (dispatch: any, getState: () => any) => {
      const books = getState().searchResults.books;
      const foundBook = books.filter((book : Book) => book.id === bookId);
      if (foundBook.length > 0) {
        dispatch(updateWishList([{ id: foundBook[0].id, title: foundBook[0].volumeInfo.title }]));
      }
    };
}

export const wishlistSlice = createSlice({
  name: 'wishlist-results',
  initialState,
  reducers: {
    updateWishList: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishlist = [...state.wishlist, ...action.payload];
      alert('Added to Wishlist Successfully!');
    },
    deleteFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
    },
  },
});

export const { updateWishList, deleteFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

