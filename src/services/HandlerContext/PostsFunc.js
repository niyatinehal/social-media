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

  //bookmark needs to be debuged

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
      mainDispatcher({
        type: "addToBookmark",
        payload: response.data.bookmarks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkBookmark = () => {
    return mainState.bookMark?.map((bookmark) => bookmark._id);
  };

  const removeBookmark = async (postId) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        empt,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      console.log("remove bookmark", response.data.bookmarks);
      mainDispatcher({
        type: "addToBookmark",
        payload: response.data.bookmarks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //create a post
  const uploadImg = async (post) => {
    try {
      const file = post.img;
      console.log(file);
      const present_key = "social_media_proj";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", present_key);
      if (post.img) {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/king-cloud/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const x = await res.json();
        console.log(x.url);
        post.img = x.url;
      } else {
        return { ...post, img: null };
      }
    } catch (e) {
      console.log(e);
    }
    return post;
  };

  const newPost = async (post) => {
    try {
      const response = await axios.post(
        "/api/posts",
        {
          postData: post,
        },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      if (response.status === 201) {
        return response.data.posts;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadNewPost = async (post) => {
    const postResult = await uploadImg(post);
    console.log(postResult);
    const newPostResult = await newPost(postResult);
    mainDispatcher({ type: "getPosts", payload: newPostResult });
  };
  //continue with edit

  const edit = async (post) => {
    console.log("edit contains:",post)
    try {
      const response = await axios.post(
        `/api/posts/edit/${post._id}`,
        { postData: post },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      if ((response.status === 201)) {
        return response.data.posts;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (editPost) => {
    console.log("EDITED POST: ",editPost)
    try {
      const editedPost = await uploadImg(editPost);
      console.log("editedPost: ",editedPost);
      const editedResult = await edit(editedPost);
      console.log("editedResult:" ,editedResult);
      mainDispatcher({ type: "getPosts", payload: editedResult });
    } catch (error) {
      console.log(error);
    }
  };

  //continue with delete post

  return (
    <PostContext.Provider
      value={{
        likeHandler,
        getPosts,
        dislikeHandler,
        checkLikes,
        initialBookmark,
        bookmarkAdded,
        checkBookmark,
        removeBookmark,
        uploadNewPost,
        editPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
