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
    user: [],
    isLoggedIn: storedToken ? true : false,
    signedInUser: {},
    userProfile:{fName: "", lName: "", username: "" },
    bookMark: [],
    posts: [],
    token:storedToken ?storedToken :''
  };
  //  signedInUser: {
  //     fName: "",
  //     lName: "",
  //     userName: "",
  //     bio: "",
  //     portFolio: "",
  //     dp: "",
  //   },

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
          user: action.payload,
        };
      case "setUser":
        return{
          ...state,
          signedInUser:action.payload
        }
      // case "userDetails": {
      //   const user = {
      //     username: action.payload.username,
      //   };

      //   return {
      //     ...state,
      //     signedInUser: user,
      //   };
      // }

      case "profileData":{
        const user={
          fName:action.payload.firstName,
          lName:action.payload.lastName,
          username:action.payload.username
        }
        return{
          ...state,
          userProfile:user
        }
      }

      case "loggedInTrue":
        return {
          ...state,
          isLoggedIn: action.payload,
        };

      case "setToken":
        return{
          ...state,
          token:action.payload
        }
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
