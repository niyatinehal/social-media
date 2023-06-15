//liked & disliked
import axios from "axios";
import React, { useContext, useReducer } from "react";

import { createContext } from "react";
import { MainContext } from "../contexts/MainContext";

export const PostContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const { mainState, mainDispatcher, loggedInUser } = useContext(MainContext);

  const empt = JSON.stringify({});

  const encodedToken = localStorage.getItem("token");

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      if (response.status === 200) {
        mainDispatcher({ type: "getPosts", payload: response.data.posts });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/like/${postId}`, empt, {
        headers: {
          authorization: encodedToken,
        },
      });
      if (response.status === 201) {
        console.log("likeHandler:", response.data.posts);
        mainDispatcher({ type: "getPosts", payload: response.data.posts });
      }
    } catch (error) {
      console.log("like-error", error);
    }
  };

  const dislikeHandler = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/dislike/${postId}`, empt, {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log(postId);
      if (response.status === 201) {
        mainDispatcher({ type: "getPosts", payload: response.data.posts });
        console.log("dislikeHandler:", response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkLikes = () => {
    const check = mainState.posts.map((post) =>
      post.likes.likedBy?.find(
        (user) => user.username === loggedInUser.username
      ) === undefined
        ? false
        : post._id
    );
    return check;
  };

  //bookmark

  const initialBookmark = async () => {
    try {
      const response = await axios.get("/api/users/bookmark", {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log("bookMark Init:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkAdded = async (postId) => {
    try {
      const response = await axios.post(`/api/users/bookmark/${postId}`, empt, {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log("bookmark added:", response.data.bookmarks);
      mainDispatcher({type:"addToBookmark",payload:response.data.bookmarks})
    } catch (error) {
      console.log(error);
    }
  };

  const checkBookmark=()=>{
    return mainState.bookMark?.map((bookmark)=>bookmark._id)
  }

  const removeBookmark=async(postId)=>{
try {
  const response=await axios.post(`/api/users/remove-bookmark/${postId}`,empt,{
    headers:{
      authorization:encodedToken
    }
  })
  console.log("remove bookmark",response.data.bookmarks);
  mainDispatcher({type:"addToBookmark",payload:response.data.bookmarks})
} catch (error) {
  console.log(error)
}
  }

  return (
    <PostContext.Provider
      value={{
        likeHandler,
        getPosts,
        dislikeHandler,
        checkLikes,
        initialBookmark,
        bookmarkAdded,
        checkBookmark,removeBookmark
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
