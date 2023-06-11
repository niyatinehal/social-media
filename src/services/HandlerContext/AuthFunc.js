import React, { Children, createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { mainDispatcher, mainState } = useContext(MainContext);

  const LoginHandler = (userDeets) => {
    const login = async () => {

      try {
        const response = await axios.post("/api/auth/login", {
          username: userDeets.username,
          password: userDeets.password
        });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.encodedToken);
          {console.log("loginc",response.data.foundUser)}
          authDispatcher({ type: "loggedInTrue", payload: true });
          authDispatcher({ type: "setUser", payload: response.data.foundUser });
          authDispatcher({
            type: "setToken",
            payload: response.data.encodedToken,
          });
          mainDispatcher({
            type: "getUsers",
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

        console.log("signup check",response)

        if (response.status === 201) {
          localStorage.setItem("token", response.data.encodedToken);
          authDispatcher({ type: "loggedInTrue", payload: true });
          authDispatcher({
            type: "setUser",
            payload: response.data.createdUser,
          });
          authDispatcher({
            type: "setToken",
            payload: response.data.encodedToken,
          });
          mainDispatcher({type:"getUsers",payload:userDetails});
        }
      } catch (error) {
        console.log("sign up error", error);
      }
    };
    signup();
  };
  const storedToken = localStorage.getItem("token");

  const authReducer = (state, action) => {
    switch (action.type) {
      case "loggedInTrue":
        return {
          ...state,
          isLoggedIn: action.payload,
        };
      case "loggedInFalse":
        return {
          ...state,
          isLoggedIn: action.payload,
        };
      case "setUser":
        return {
          ...state,
          user: action.payload,
        };
      case "setToken":
        return {
          ...state,
          token: action.payload,
        };
      default:
        return state;
    }
  };

  const [authState, authDispatcher] = useReducer(authReducer, {
    isLoggedIn: storedToken ? true : false,
    user: {},
    token: storedToken ? storedToken : "",
  });


  return (
    <div>
      <AuthContext.Provider
        value={{ LoginHandler, signupHandler, authState, authDispatcher }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
