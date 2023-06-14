//liked & disliked
import axios from "axios";
import React, { useContext, useReducer } from "react";

import { createContext } from "react";
import { MainContext } from "../contexts/MainContext";

export const PostContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const { mainState,dispatcherMain,loggedInUser } = useContext(MainContext);

  const empt=JSON.stringify({});
  console.log(empt)

  const encodedToken=localStorage.getItem("token")

  const getPosts=async()=>{
try {
  const response=await axios.get("/api/posts");
  if(response.status===200){
    dispatcherMain({type:"getPosts",payload:response.data.posts})  
  }
} catch (error) {
  console.log(error)
}
  }

  const likeHandler = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/like/${postId}`,empt, {
        headers: {
          authorization: mainState.token,
        },
      });
      console.log("likeHandler:", response.data.posts);
    } catch (error) {
      console.log("like-error", error);
    }
  };

  return (
    <PostContext.Provider value={{ likeHandler,getPosts }}>
      {children}
    </PostContext.Provider>
  );
};
