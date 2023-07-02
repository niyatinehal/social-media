import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { MainContext } from "../contexts/MainContext";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { mainDispatcher, mainState } = useContext(MainContext);
  const encodedToken = localStorage.getItem("token");

  const existingFollower = (userName) => {
    const followerCheck = mainState.following.find((user) => user === userName);
    return followerCheck === undefined ? false : true;
  };

  const imageUpload = async (post) => {
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
        post.avatar = x.url;
      } else {
        return { ...post, img: null };
      }
    } catch (error) {
      console.log(error);
    }
    return post;
  };

  const editProfile = async (newDetails) => {
    try {
      const response = await axios.post(
        `/api/user/edit`,
        { userData: newDetails },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      mainDispatcher({ type: "userDetails", payload: response.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  const editedProf = async (user) => {
    console.log(user);
    const updatedUser = await imageUpload(user);
    console.log(updatedUser);
    const newUserDetails = await editProfile(updatedUser);
  };

  const avatar = (userName) => {
    const url = mainState.existingUser.find(
      (user) => user.username === userName
    );
    console.log(url)
    return url ? url.avatar : undefined;
  };

  return (
    <UserContext.Provider value={{ existingFollower, editedProf, avatar }}>
      {children}
    </UserContext.Provider>
  );
};
