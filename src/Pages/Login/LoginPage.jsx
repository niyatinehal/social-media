import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
import { MainContext } from "../../services/contexts/MainContext";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import "./LoginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { Login, signup, authState } = useContext(AuthContext);
  const { mainState } = useContext(MainContext);

  const userData = { username: "", password: "" };

  const guestUser = {
    username: "tonyStark",
    password: "TonyStark123",
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!userData.username || !userData.password) {
      console.log("invalid input");
    } else {
      console.log("logged in data", userData);
      Login(userData);
    }
  };

  const guestLogin = (e) => {
    e.preventDefault();
    // setUserData(guestUser);
    Login(guestUser);
  };

  return (
    <Box className="login-main-page">
      <Heading as="h1" size="xl" mb={6} className="heading-top">
        K-Verse
      </Heading>
      <Heading as="h1" size="xl" mb={6} className="login-heading">
        Login
      </Heading>
      <Box
        className="container"
        mx="auto"
        mt={9}
        p={4}
        borderRadius="md"
        boxShadow="md"
        maxWidth="400px"
      >
        <Box className="form-box">
          <div>
            <FormControl>
              <FormLabel textAlign="center" className="form-lable-login">
                Username:
                <Input className="signup-input"
                  id="username"
                  type="text"
                  //value={userData.username}
                  onChange={(e) => (userData.username = e.target.value)}
                />
              </FormLabel>
            </FormControl>

            <FormControl>
              <FormLabel textAlign="center" className="form-lable-login">
                Password:
                <Input className="signup-input"
                  id="password"
                  type="password"
                  //value={userData?.password}
                  onChange={(e) => (userData.password = e.target.value)}
                />
              </FormLabel>
            </FormControl>

            <div>
              <Button className="signup-button"
                colorScheme="blue"
                size="lg"
                width="full"
                onClick={(e) => loginHandler(e)}
              >
                Login
              </Button>
            </div>
            <div>
              <Button className="signup-button"
                colorScheme="blue"
                size="lg"
                width="full"
                onClick={(e) => guestLogin(e)}
              >
                Guest Login
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
