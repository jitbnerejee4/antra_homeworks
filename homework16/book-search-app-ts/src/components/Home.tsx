import React, { useState, ChangeEvent, FormEvent } from 'react';
import SearchBar from './SearchBar';
import ShowBooks from './ShowBooks';
import { useDispatch } from 'react-redux';
import { getBooks } from '../features/slices/resultSlice';
import { addtoWishlist } from '../features/slices/wishlistSlice';
import { AppDispatch } from '../app/store';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const dispatch: AppDispatch = useDispatch(); 

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getBooks(input));
    setInput('');
  };

  const handleItemClick = (bookId: string) => {
    dispatch(addtoWishlist(bookId));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-10 mt-5 tracking-wider">Book Search</h1>
      <SearchBar handleInputChange={handleInputChange} handleSubmit={handleSubmit} input={input} />
      <ShowBooks handleItemClick={handleItemClick} />
    </div>
  );
}
