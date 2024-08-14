import React from 'react';
import './App.css';
import Home from './components/Home';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Wishlist from './components/Wishlist';
import { Routes, Route} from 'react-router-dom';
import { AppDispatch } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromWishlist } from './features/slices/wishlistSlice';


function App() {
  const isLoading = useSelector((state:any)=>state.searchResults.isLoading)
  const dispatch: AppDispatch = useDispatch()

  const deleteHandler = (itemId:any)=>{
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
          {/* <Route path='wishlist' element={<Wishlist deleteHandler={deleteHandler}/>}/> */}
          <Route path='wishlist' element={<Wishlist deleteHandler={deleteHandler}/>}/>
        </Routes>
        </> 


      }
    </div>
  );
}

export default App;
