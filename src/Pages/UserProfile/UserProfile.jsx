import React, { useContext, useState } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
import "./userProfile.css";
import { Box } from "@chakra-ui/react";
import "./userProfile.css";
import { SideBar } from "../../components/SideBar/Sidebar";
import { Suggestions } from "../../components/Suggestions/Suggestions";

export const UserProfile = () => {
  const { mainState, loggedInUser } = useContext(MainContext);
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(loggedInUser);
  console.log("userPrifile", profile);
  return (
    <Box className="profile">
      <SideBar />
      <Box className="profile-data">
        <Box className="user-info-profile">
          <img src={loggedInUser.avatar} className="avatar-profile" />
          <h1>
            {" "}
            {loggedInUser.firstName} {loggedInUser.lastName}
          </h1>
          <h3>@{loggedInUser.username}</h3>
        </Box>
        <Box className="profile-details">
          <h3><strong>Bio: </strong>{loggedInUser.bio}</h3>
        </Box>
      </Box>
      {/* <Suggestions/> */}
    </Box>
  );
};
