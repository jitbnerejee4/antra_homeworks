import React from 'react'
import SearchBar from './SearchBar';
import ShowBooks from './ShowBooks';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getBooks } from '../features/slices/resultSlice';
import { addtoWishlist } from '../features/slices/wishlistSlice';


export default function Home() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch();
  
    const handleInputChange = (event)=>{
      setInput(event.target.value)
      
    }
  
    const handleSubmit = (event)=>{
      event.preventDefault()
      dispatch(getBooks(input))
      setInput('')
  
    }

    const handleItemClick = (bookId)=>{
        // console.log(bookId)
        dispatch(addtoWishlist(bookId))
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline mb-10 mt-5 tracking-wider">Book Search</h1>
            <SearchBar handleInputChange={handleInputChange} handleSubmit={handleSubmit} input={input}/>
            <ShowBooks handleItemClick={handleItemClick}/>
        </div>
    )
}
