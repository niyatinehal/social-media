import React, { createContext } from "react";
import axios from "axios"; 
import { useCheckbox } from "@chakra-ui/react";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("token");
  const { mainDispatcher } = useContext(MainContext);

  const setFollowing = async (followingId) => {
    console.log(followingId);
    try {
      const response = await axios.post(
        `/api/users/follow/${followingId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      if (response.status == 200) {
        console.log("following");
      }
      const followingUser = response.data.user.following.map(
        (user) => user.username
      );
      mainDispatcher({ type: "userDetails", payload: response.data.user });
      mainDispatcher({ type: "addFollowing", payload: followingUser });
      console.log(followingUser);
    } catch (error) {
      console.log(error);
    }
  };

  const setUnfollow = async (unfollowId) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${unfollowId}`,
        {},
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );
      if (response.status === 200) {
        console.log("unfollwing");
      }
      let unfollowUser = response.data.user.following.map(
        (user) => user.username
      );
      mainDispatcher({ type: "userDetails", payload: response.data.user });
      mainDispatcher({ type: "addFollowing", payload: unfollowUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FollowContext.Provider value={{ setFollowing,setUnfollow }}>
      {children}
    </FollowContext.Provider>
  );
};
