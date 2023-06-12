//liked & disliked
import axios from "axios";
import React, { useContext, useReducer } from "react";

import { createContext } from "react";
import { MainContext } from "../contexts/MainContext";

export const PostContext = createContext();

export const PostsContextProvider = ({ children }) => {
  const { mainState } = useContext(MainContext);
  const initialState = {
    likes: 0,
  };

  const postReducer = (state, action) => {
    switch (action.type) {
      case "liked":
        return {
          ...state,
          liked: action.payload + 1,
        };

      default:
        return state;
    }
  };
  const [postState, postDispatch] = useReducer(postReducer, initialState);

  const likeHandler = async (postId) => {
    console.log(postId);
    try {
      const response = await axios.post(`/api/posts/like/${postId}`, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0NDhiMmQ5My0zNzcyLTQ3OTUtOWViYS1mMzlkMDZmZTFjOWEiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.ek5miVGHotZO3WaKUsUQy4mcyBpqiVehiV2qac2808w",
        },
      });
      console.log("likeHandler:", response);
    } catch (error) {
      console.log("like-error", error);
    }
  };

  return (
    <PostContext.Provider value={{ postState, postDispatch, likeHandler }}>
      {children}
    </PostContext.Provider>
  );
};
