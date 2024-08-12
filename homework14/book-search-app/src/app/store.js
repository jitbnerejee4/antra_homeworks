import {configureStore} from '@reduxjs/toolkit'
import resultReducer from '../features/slices/resultSlice'
import wishlistReducer from '../features/slices/wishlistSlice'


const store = configureStore({
    reducer: {
        searchResults: resultReducer,
        wishListData: wishlistReducer 
    }
})

export default store;