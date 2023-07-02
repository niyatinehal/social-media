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
    >
      <Box className="logo" as="img" src="C:\Users\B K Choudhary\Desktop\niyati\padhai\Neog\Assignment\social-media\src\asset\k-verse-low-resolution-logo-color-on-transparent-background.png">       
      </Box>

    
      <Button
        className="logout-button"
        colorScheme="blue"
        size="sm"
        onClick={logout}
      >
        Logout
      </Button>
    </Flex>
  );
};
