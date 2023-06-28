import React, { useContext } from "react";
// import "../navbar.css";
import {
  Box,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Image
} from "@chakra-ui/react";
import "./navbar.css";

import { AuthContext } from "../../services/HandlerContext/AuthFunc";
export const Navbar = () => {
  const { logout, signup } = useContext(AuthContext);
  return (
    <Flex
      className="navbar"
      // as="nav"
      // bg="var(--color1)"
      // padding="10px"
      // display={{ base: "flex", md: "none" }}
      // justifyContent="space-around"
      // alignItems="center"
      // color="var(--color5)"
    >
      <Box className="logo" as="img" src="C:\Users\B K Choudhary\Desktop\niyati\padhai\Neog\Assignment\social-media\src\asset\k-verse-low-resolution-logo-color-on-transparent-background.png">
       
      </Box>

      <Input
        className="search-bar"
        placeholder="Search"
        size="sm"
        // type="text"
        // placeholder="Search"
        // mt={{ base: "10px", md: "0" }}
        // mr={{ base: "0", md: "10px" }}
        // bg="white"
        // color="var(--color5)"
        // _placeholder={{ color: "var(--color5)" }}
      />
      <Button
        className="logout-button"
        colorScheme="blue"
        size="sm"
        // colorScheme="whiteAlpha"
        // cursor="pointer"
        onClick={logout}
      >
        Logout
      </Button>
    </Flex>
  );
};
