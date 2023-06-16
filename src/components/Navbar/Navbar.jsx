import React from "react";
import "../navbar.css"
export const Navbar = () => {
  return (
    <div class="navbar">
      <div class="navbar-logo">Logo</div>
      <div class="navbar-search">
        <input type="text" placeholder="Search" />
      </div>
      <div class="navbar-logout">Logout</div>
    </div>
  );
};
