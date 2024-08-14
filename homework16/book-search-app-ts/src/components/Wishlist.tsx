import React from 'react'
import { useSelector } from 'react-redux'


interface WishlistProps {
    deleteHandler: (id: any) => void;
}
export default function Wishlist({deleteHandler} : WishlistProps) {
    const wishlist = useSelector((state:any)=>state.wishListData.wishlist)
    console.log(wishlist)
    interface WishlistItem {
    id: string;
    title: string;
    }
    if(wishlist.length === 0){
        return(
            <div className="mt-96">
                <h2>No items in Wishlist!</h2>
            </div>
            
        )
    }else{
        return (
            <div>
                <h1 className="text-3xl font-bold underline mb-10 mt-5 tracking-wider">WishList ({wishlist.length})</h1>
                <div className="container mx-auto mb-20 bg-blue-50 p-4 rounded-xl shadow-lg max-w-xl">
                    {
                        wishlist.map((item:WishlistItem, index:number)=>{
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
