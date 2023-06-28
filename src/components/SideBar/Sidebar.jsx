import { Box, IconButton, VStack, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookmark,
  faCompass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./sidebar.css";

export const SideBar = () => {
  return (
    <Box className="sidebar" px={4} py={6}>
      <VStack className="sidebar-nav">
        <Box>
          {" "}
          <IconButton
            aria-label="Home"
            icon={<FontAwesomeIcon icon={faHome} />}
            variant="ghost"
            size="lg"
            className="sidebar-icon"
          />
          <NavLink className="sidebar-link" to="/home">
            Home
          </NavLink>
        </Box>

        <Box>
          <IconButton
            aria-label="Home"
            icon={<FontAwesomeIcon icon={faCompass} />}
            variant="ghost"
            size="lg"
            className="sidebar-icon"
          />
          <NavLink className="sidebar-link" to="/explore">
            Explore
          </NavLink>
        </Box>

        <Box>
          <IconButton
            aria-label="Home"
            icon={<FontAwesomeIcon icon={faBookmark} />}
            variant="ghost"
            size="lg"
            className="sidebar-icon"
          />
          <NavLink className="sidebar-link" to="/bookmark">
            Bookmarks
          </NavLink>
        </Box>

        <Box>
          {/* <IconButton
            aria-label="Home"
            variant="ghost"
            size="lg"
            className="sidebar-icon"
          /> */}
          <Flex className="sidebar-user-profile" align="center">
            <Box className="sidebar-user-icon">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <NavLink className="sidebar-link" to="/user-profile">
                <Text className="sidebar-user-name" ml={2}>
                  User Profile
                </Text>
              </NavLink>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};
