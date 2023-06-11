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

  const mainData = {
    user: [],
    isLoggedIn: false,
    signedInUser: {fName:'',lName:'',userName:''},
    bookMark: [],
    posts: [],
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
      case "newUsers":
        return {
          ...state,
          signedInUser: action.payload,
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
