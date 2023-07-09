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
      // const present_key = "social_media_proj";
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("upload_preset", present_key);
      if (post.img) {
        // const res = await fetch(
        //   `https://api.cloudinary.com/v1_1/king-cloud/image/upload`,
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // );
        // const x = await res.json();
        // console.log(x.url);
        post.avatar = null;
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
        `/api/users/edit`,
        { userData: newDetails },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      if(response.status===201){
        console.log("changed");
        mainDispatcher({ type: "userDetails", payload: response.data.user });
        return response.data.user
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  console.log("@@",mainState)
 
  const editedProf = async (user) => {
    
    const updatedUser = await imageUpload(user);
    
    const newUserDetails = await editProfile(updatedUser);
    console.log("^^^",newUserDetails)
     mainDispatcher({type:"getPosts", payload:newUserDetails})
  };

  const avatar = (userName) => {
    const url = mainState.existingUser.find(
      (user) => user.username === userName
    );
    
    return url ? url.avatar : undefined;
  };

  return (
    <UserContext.Provider value={{ existingFollower, editedProf, avatar }}>
      {children}
    </UserContext.Provider>
  );
};
