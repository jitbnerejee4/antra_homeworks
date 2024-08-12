import { createSlice } from "@reduxjs/toolkit";


function addtoWishlist(bookId){
    return async function add(dispatch, getState) {
        // console.log(getState().searchResults.books.items)
        const books = getState().searchResults.books.items
        const foundBook = books.filter((book)=>book.id === bookId)
        // console.log(foundBook)
        dispatch(updateWishList(foundBook))


    }
}
export const wishlistSlice = createSlice({
    name: 'wishlist-results',
    initialState: {
        wishlist: []
    },
    reducers:{
        updateWishList: (state, action)=>{
            // console.log(action.payload)
            // console.log(action.payload[0].volumeInfo)
            state.wishlist = [...state.wishlist, {id: action.payload[0].id, title: action.payload[0].volumeInfo.title}]
            alert("Added to Wishlist Successfully!")

        },
        deleteFromWishlist: (state, action)=>{
            console.log(action.payload)
            const tempWishlist = state.wishlist.filter((item)=>item.id !== action.payload)
            state.wishlist = tempWishlist
        }
    }
})

export const { updateWishList, deleteFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
export {addtoWishlist}