//liked & disliked
import axios from "axios";
import React, { useReducer } from "react";

import { createContext } from "react";

export const PostContext = createContext();

export const PostsContextProvider = ({ children }) => {


  const initialState = {
    likes: 0,
  };

  const postReducer = (state, action) => {
    switch (action.type) {
      case "liked":
        return {
          ...state,
          liked: action.payload+1,
        };

      default:
        return state;
    }
  };
  const [postState, postDispatch] = useReducer(postReducer, initialState);

  const likeHandler=async()=>{

    const response= await axios.post('/api/posts/like/:postId')
     console.log("likeHandler:",response)
   
  }

  return (
    <PostContext.Provider value={{postState,postDispatch,likeHandler}}>
      {children}
    </PostContext.Provider>
  );
};
