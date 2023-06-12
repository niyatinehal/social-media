import React, { Children, createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { mainDispatcher, mainState } = useContext(MainContext);
  const navigate = useNavigate();

  const LoginHandler = (userDeets) => {
    const login = async () => {
      try {
        const response = await axios.post("/api/auth/login", {
          username: userDeets.username,
          password: userDeets.password,
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.encodedToken);
          {
            console.log("loginc", response.data.foundUser);
          }
          mainDispatcher({ type: "loggedInTrue", payload: true });
          mainDispatcher({ type: "setUser", payload: response.data.foundUser });
          // mainDispatcher({
          //   type: "setToken",
          //   payload: response.data.encodedToken,
          // });
          mainDispatcher({
            type: "profileData",
            payload: response.data.foundUser,
          });
        }
      } catch (error) {
        console.log("login Error", error);
      }
    };
    login();
  };

  const signupHandler = (userDetails) => {
    const signup = async () => {
      try {
        const response = await axios.post("/api/auth/signup", {
          firstName: userDetails?.fname,
          lastName: userDetails?.lName,
          username: userDetails?.username,
          password: userDetails?.password,
        });

        console.log("signup check", response);

        if (response.status === 201) {
          localStorage.setItem("token", response.data.encodedToken);
          mainDispatcher({ type: "loggedInTrue", payload: true });
          mainDispatcher({
            type: "setUser",
            payload: response.data.createdUser,
          });
          mainDispatcher({
            type: "setToken",
            payload: response.data.encodedToken,
          });
          mainDispatcher({ type: "userDetails", payload: userDetails });
          mainDispatcher({
            type: "profileData",
            payload: userDetails,
          });
          mainDispatcher({ type: "loggedInTrue", payload: true });
        }
      } catch (error) {
        console.log("sign up error", error);
      }
    };
    signup();
  };

  return (
    <div>
      <AuthContext.Provider value={{ LoginHandler, signupHandler }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
