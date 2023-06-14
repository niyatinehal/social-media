//liked & disliked
import axios from "axios";
import React, { useContext, useReducer } from "react";

import { createContext } from "react";
import { MainContext } from "../contexts/MainContext";

export const PostContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const { mainState,mainDispatcher,loggedInUser } = useContext(MainContext);

  const empt=JSON.stringify({});

  const encodedToken=localStorage.getItem("token")

  const getPosts=async()=>{
try {
  const response=await axios.get("/api/posts");
  if(response.status===200){
   mainDispatcher({type:"getPosts",payload:response.data.posts})  
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
      if(response.status===201){
        console.log("likeHandler:", response.data.posts);
      mainDispatcher({type:"getPosts",payload:response.data.posts});
      }
      
    } catch (error) {
      console.log("like-error", error);
    }
  };

  const dislikeHandler=async(postId)=>{
try {
  const response = await axios.post(`/api/posts/like/${postId}`,empt, {
        headers: {
          authorization: mainState.token,
        },
      });
      if(response.status===201){
        console.log("dislike handler",response.data.posts.likes.likeCount)
      }
  
} catch (error) {
  console.log(error)
}
  }

  const checkLikes=()=>{
    console.log(mainState.loggedInUser)
const check=mainState.posts.map((post)=>post.likes.likedBy?.find((user)=>user.username===loggedInUser.username)===undefined?false:post._id);
console.log(check);
return check
  }


  return (
    <PostContext.Provider value={{ likeHandler,getPosts,dislikeHandler,checkLikes}}>
      {children}
    </PostContext.Provider>
  );
};
