import React, {
  Children,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { mainDispatcher, mainState } = useContext(MainContext);
  const navigate = useNavigate();

  const Login=(userDeets)=>{
    const login = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: userDeets.username,
        password: userDeets.password,
      });

      localStorage.setItem("token", response.data.encodedToken);
      if (response.status === 200) {
        console.log("user logged;",response.data.foundUser)
        mainDispatcher({
          type: "userDetails",
          payload: response.data.foundUser,
        });
        mainDispatcher({ type: "loggedInTrue", payload: true });
        mainDispatcher({
          type: "setToken",
          payload: response.data.encodedToken,
        });

        navigate("/");
      }
    } catch (error) {
      mainDispatcher({ type: "LoggedInFalse", payload: false });
      console.log("login Error", error);
    }
  };
  login();
  }

  

  const signup = async (userDetails) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName: userDetails?.fname,
        lastName: userDetails?.lName,
        username: userDetails?.username,
        password: userDetails?.password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.encodedToken);

        // mainDispatcher({ type: "isLoggedIn", payload: true }); //can be removed
        // mainDispatcher({
        //   type: "setToken",
        //   payload: response.data.encodedToken,
        // }); //check if this can be removed

        mainDispatcher({
          type: "userDetails",
          payload: response.data.createdUser,
        });
        navigate("/login-page");
      }
    } catch (error) {
      console.log("sign up error", error);
    }
  }; 


  // const logout = (e) => {
  //   localStorage.removeItem("token");
  //   mainDispatcher({ type: "loggedInFalse", payload: false });
  //   mainDispatcher({ type: "setToken", payload: "" });
  //   mainDispatcher({ type: "setUser", payload: {} });
  //   console.log("loggedOut")
  //   navigate("/");
  // };

  return (
    <div>
      <AuthContext.Provider value={{ Login, signup }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
