import React, { useContext } from 'react'
import { MainContext } from '../services/contexts/MainContext'
import { NavLink, Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({children}) => {
    const {mainState}=useContext(MainContext);
    const location=useLocation();
    console.log(localStorage.getItem("token")?"token there" : "token lost")
    console.log(mainState?.isLoggedIn)

  return mainState?.isLoggedIn ? (children):
  <>
    <Navigate to="/signup-page" state={{from:location}}/>
  </>
}
