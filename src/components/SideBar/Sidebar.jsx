import { Box, IconButton, VStack, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookmark,
  faCompass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./sidebar.css";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";

export const SideBar = () => {
  const nav=useNavigate();
  const{loggedInUser}=useContext(MainContext);
  console.log(loggedInUser);
  return (
    <Box className="sidebar" >
      <Box className="sidebar-nav">
        <Box className="sidebar-nav-top">
          <Box>
            {" "}
            <FontAwesomeIcon icon={faHome} size="lg" className="sidebar-icon" />
            <NavLink className="sidebar-link" to="/home">
              Home
            </NavLink>
          </Box>
          <Box>
            <FontAwesomeIcon icon={faCompass} className="sidebar-icon" />
            <NavLink className="sidebar-link" to="/explore">
              Explore
            </NavLink>
          </Box>

          <Box>
            <FontAwesomeIcon icon={faBookmark} className="sidebar-icon" />
            <NavLink className="sidebar-link" to="/bookmark">
              Bookmarks
            </NavLink>
          </Box>
        </Box>        
          <Box className="sidebar-user-profile" align="center">
            <Box className="sidebar-user-icon">
              <FontAwesomeIcon icon={faUser} size="lg"  className="dp"/>
              <div className="sidebar-link" onClick={()=>nav(`/profile-details/${loggedInUser.username}`)}>
                <Text className="sidebar-user-name" ml={5}>
                  User Profile
                </Text>
              </div>
            </Box>
          </Box>
      </Box>
    </Box>
  );
};
