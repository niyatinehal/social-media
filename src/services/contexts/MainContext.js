import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const initialData = async () => {
    const response = await axios.get("/api/posts");
    mainDispatcher({ type: "getPosts", payload: response.data.posts });
    const resUser = await axios.get("/api/users");
    mainDispatcher({ type: "getUsers", payload: resUser.data.users });
  };
  const storedToken = localStorage.getItem("token");

  const mainData = {
    existingUser: [],
    isLoggedIn: storedToken ? true : false,
    loggedInUser: { fName: "", lName: "", username: "" },
    bookMark: [],
    posts: [],
    followers: [],
    following: [],
    token: storedToken ? storedToken : "",
  };

  const mainReducer = (state, action) => {
    switch (action.type) {
      case "getPosts":
        return {
          ...state,
          posts: action.payload,
        };
      case "getUsers":
        return {
          ...state,
          existingUser: action.payload,
        };
      case "userDetails":
        const user = {
          fName: action.payload.firstName,
          lName: action.payload.lastName,
          username: action.payload.username,
        };
        return {
          ...state,
          loggedInUser: user,
          bookMark: action.payload.bookmark,
          followers: action.payload.followers,
          following: action.payload.following,
        };

      case "loggedInTrue":
        return {
          ...state,
          isLoggedIn: action.payload,
        };
      case "setToken":
        return {
          ...state,
          token: action.payload,
        };
    }
  };

  const [mainState, mainDispatcher] = useReducer(mainReducer, mainData);

  useEffect(() => {
    initialData();
  }, []);

  return (
    <MainContext.Provider value={{ mainDispatcher, mainState }}>
      {children}
    </MainContext.Provider>
  );
};
