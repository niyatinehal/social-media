import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const initialData = async () => {
    try {
      const response = await axios.get("/api/posts");
      mainDispatcher({ type: "getPosts", payload: response.data.posts });
      const resUser = await axios.get("/api/users");

      mainDispatcher({ type: "getUsers", payload: resUser.data.users });
    } catch (error) {
      console.log(error);
    }
  };
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON?.parse(localStorage?.getItem("loggedInUser"));

  const mainData = { 
    existingUser: [],
    isLoggedIn: storedToken ? true : false,
    loggedInUser: storedUser
      ? storedUser
      : { fName: "", lName: "", username: "" },
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
        return {
          ...state,
          loggedInUser: action.payload,
          followers: action.payload.followers,
          following: action.payload.following,
        };

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
      case "setToken":
        return {
          ...state,
          token: action.payload,
        };
      case "addToBookmark":
        return{
          ...state,
          bookMark:action.payload
        }
      case "addComments": 
        const{postId,comment}=action.payload;
        const updateComment=state.posts.map((post)=>{
          if(post.id===postId){
            return {
              ...post ,comments:[...post.comments,comment],
            }
          }
          else{
            return post;
          }
        });
        return {
          ...state,posts:updateComment
        }
      case "addFollowing":
        return{
          ...state,following:action.payload
        }
    }
  };

  const [mainState, mainDispatcher] = useReducer(mainReducer, mainData);

  useEffect(() => {
    initialData();
  }, []);

    useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(mainState?.loggedInUser));
  }, [mainState?.loggedInUser]);

  return (
    <MainContext.Provider value={{ mainDispatcher, mainState,loggedInUser:mainState?.loggedInUser }}>
      {children}
    </MainContext.Provider>
  );
};
