import React, { useContext } from "react";
// import "../navbar.css";
import { Box, Flex, Input, Button, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
export const Navbar = () => {
  const { logout, signup } = useContext(AuthContext);
  return (
      <Box
      as="nav"
      bg="var(--color1)"
      padding="10px"
      display={{ base: "flex", md: "none" }}
      justifyContent="space-around"
      alignItems="center"
      color="var(--color5)"
    > 
      <Box fontWeight="bold" fontSize="20px">
        Logo
      </Box>

      <Flex alignItems="center">
        <Input
          type="text"
          placeholder="Search"
          mt={{ base: "10px", md: "0" }}
          mr={{ base: "0", md: "10px" }}
          bg="white"
          color="var(--color5)"
          _placeholder={{ color: "var(--color5)" }}
        />
        <Button
          colorScheme="whiteAlpha"
          cursor="pointer"
          onClick={logout}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );
};
