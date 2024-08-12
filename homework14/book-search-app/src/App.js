import './App.css';
// import SearchBar from './components/SearchBar';
// import { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { getBooks } from './features/slices/resultSlice';
// import ShowBooks from './components/ShowBooks';
import NavBar from './components/NavBar';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import WishList from './components/WishList';
import { deleteFromWishlist } from './features/slices/wishlistSlice';
import Loading from './components/Loading';
import {useSelector} from 'react-redux'




function App() {
  // const [input, setInput] = useState('')
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.searchResults.isLoading)

  // const handleInputChange = (event)=>{
  //   setInput(event.target.value)
    
  // }

  // const handleSubmit = (event)=>{
  //   event.preventDefault()
  //   dispatch(getBooks(input))
  //   setInput('')

  // }

  const deleteHandler = (itemId)=>{
    console.log(itemId)
    dispatch(deleteFromWishlist(itemId))
  }
  return (
    <div className="App">
      {
        isLoading ? <Loading/> :
        <>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='wishlist' element={<WishList deleteHandler={deleteHandler}/>}/>
        </Routes>
        </> 


      }
      
      {/* <SearchBar handleInputChange={handleInputChange} handleSubmit={handleSubmit} input={input}/>
      <ShowBooks/> */}
    </div>
  );
}

export default App;
