import {createSlice} from '@reduxjs/toolkit'


function getBooks(searchTerm){
    return async function fetchBooks(dispatch, getState){
        dispatch(requestStarted())
        setTimeout( async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=0&maxResults=20`);
                const data = await response.json()
                dispatch(requestSucceed(data))
                // console.log(getState())
            } catch (error) {
                dispatch(requestFailed(error))
            }
        }, 2000);

    }
}


export const resultSlice = createSlice({
    name: 'search-results',
    initialState: {
        books: [],
        isLoading: false
    },
    reducers:{
        requestStarted: (state) =>{
            console.log("STARTED")
            state.isLoading = true
        },
        requestSucceed: (state, action)=>{
            state.books = action.payload
            // console.log(state.books)
            state.isLoading = false
        },
        requestFailed: (state)=>{
            console.log("FAILED")
            state.isLoading = false
        }
    }
}) 

export const {requestStarted, requestSucceed, requestFailed} = resultSlice.actions 
export default resultSlice.reducer //this will export all the reducers. Export the reducer to be used in the store as "resuldReducer". 
export {getBooks}