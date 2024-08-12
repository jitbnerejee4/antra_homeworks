import React from 'react'
import {useSelector} from 'react-redux'

export default function WishList({ deleteHandler }) {
    const wishlist = useSelector((state)=>state.wishListData.wishlist)
    console.log(wishlist)
    if(!wishlist){
        return(
            <h2>No items in Wishlist!</h2>
        )
    }else{
        return (
            <div>
                <h1 className="text-3xl font-bold underline mb-10 mt-5 tracking-wider">WishList ({wishlist.length})</h1>
                <div className="container mx-auto mb-20 bg-blue-50 p-4 rounded-xl shadow-lg max-w-xl">
                    {
                        wishlist.map((item, index)=>{
                            return(
                                <div id={item.id} key={index} className="flex justify-between items-center">
                                    <span className="mr-5">{item.title}</span>
                                    {/* reference: https://flowbite.com/docs/components/buttons/ */}
                                    <span>
                                        <button type="button" onClick={()=>deleteHandler(item.id)} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
    
            </div>
        )
    }
    
}
