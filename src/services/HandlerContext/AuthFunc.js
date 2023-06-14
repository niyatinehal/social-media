import React, { Children, createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { mainDispatcher, mainState } = useContext(MainContext);
  const navigate = useNavigate();

  const login = async (userDeets) => {
    console.log(userDeets);
    try {
      const response = await axios.post("/api/auth/login", {
        username: userDeets.username,
        password: userDeets.password,
      });
      localStorage.setItem("token", response.data.encodedToken);
      {
        console.log("loginc", response.data.foundUser);
      }
      mainDispatcher({ type: "userDetails", payload: response.data.foundUser });

      if (response.status === 200) {
        console.log("after login", mainState.loggedInUser);
        navigate("/");
      }
    } catch (error) {
      console.log("login Error", error);
    }
  };

  const signup = async (userDetails) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: userDetails?.fname,
        lastName: userDetails?.lName,
        username: userDetails?.username,
        password: userDetails?.password,
      });
      localStorage.setItem("token", response.data.encodedToken);

      if (response.status === 201) {
        console.log("after signup", mainState.signedInUser);
        <p>welcome</p>
        navigate("/login-page");
      }
    } catch (error) {
      console.log("sign up error", error);
    }
  };

  return (
    <div>
      <AuthContext.Provider value={{ login, signup }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
