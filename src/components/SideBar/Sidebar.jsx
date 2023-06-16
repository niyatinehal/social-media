import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <NavLink className="sidebar-link" to="/">Home</NavLink>
        <NavLink className="sidebar-link" to="/explore">Explore</NavLink>
        <NavLink className="sidebar-link" to="/bookmark">Bookmarks</NavLink>
        <NavLink className="sidebar-link" to="/liked">Liked Posts</NavLink>
        <div className="sidebar-avatar">
          <NavLink className="sidebar-link" to="/user-profile">Your Profile</NavLink>
        </div>
      </div>
    </div>
  );
};