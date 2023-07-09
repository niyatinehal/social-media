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
      <Box className="logo" >
      K-Verse       
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
