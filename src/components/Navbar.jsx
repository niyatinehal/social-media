import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/bookmark">Bookmarks</NavLink>
            <NavLink to="/liked">Liked Posts</NavLink>
            <NavLink to="/user-profile">Your Profile</NavLink>
        </nav>
    </div>
  )
}
