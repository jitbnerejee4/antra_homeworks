import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex space-x-4 ml-auto">
          <NavLink to="/" className="text-white hover:text-gray-200 transition duration-300">Home</NavLink>
          <NavLink to="/wishlist" className="text-white hover:text-gray-200 transition duration-300">Wishlist</NavLink>
        </div>
      </div>
    </nav>
  )
}
