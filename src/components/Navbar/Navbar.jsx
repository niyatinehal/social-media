import React, { useContext } from "react";
import "../navbar.css"
import { MainContext } from "../../services/contexts/MainContext";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
export const Navbar = () => {
    const{logout,signup}=useContext(AuthContext)
  return (
    <div className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-search">
        <input type="text" placeholder="Search" />
      </div>
      <button className="navbar-logout" onClick={logout}>Logout</button>
    </div>
  );
};
