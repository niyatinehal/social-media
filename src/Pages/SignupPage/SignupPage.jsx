import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
import { Navigate, useNavigate } from "react-router-dom";
import { MainContext } from "../../services/contexts/MainContext";
import "./SignupPage.css";
import {
  Box,
  FormLabel,
  Heading, 
  Input,
  FormControl,
  Button,
} from "@chakra-ui/react";

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const { mainDispatcher, mainState } = useContext(MainContext);

  const [userDeets, setUserDeets] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(userDeets);
  const signupHandler = (e) => {
    e.preventDefault();

    const Details = {
      fName: e.target?.firstName?.value,
      lName: e.target?.lastName?.value,
      username: e.target?.username?.value,
      email: e.target?.email?.value,
      password: e.target?.password?.value,
      confirmPassword: e.target?.confirmPassword?.value,
    };
    console.log("details", Details);

    if (Details.password !== Details.confirmPassword) {
      console.log("passwords should be same");
    } else {
      signup(Details);

      navigate("/login-page");
    }
  };

  return (
    <Box className="signup-main-page">
      <Heading as="h1" textAlign="center" className="heading-top">
        K-Verse
      </Heading>
      <Box
        maxWidth="400px"
        mx="auto"
        mt={9}
        p={4}
        borderRadius="md"
        boxShadow="md"
        className="signup-page-container"
      >
        {/* <Heading as="h1" textAlign="center" mb={6} className="signup-heading">
          Sign-up 
        </Heading> */}

        <form onSubmit={(e) => signupHandler(e)} className="signup-form">
          <FormControl id="name" mb={4} className="form-control">
            <FormLabel className="form-lable">First Name</FormLabel>
            <Input
              id="firstName"
              type="text"
              value={userDeets.firstName}
              required
              onChange={(e) =>
                setUserDeets((prev) => ({ ...prev, firstName: e.target.value }))
              }
              className="signup-input"
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-lable">Last Name</FormLabel>{" "}
            <Input
              id="lastName"
              type="text"
              value={userDeets.lastName}
              onChange={(e) =>
                setUserDeets((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-lable">User Name</FormLabel>
            <Input
              id="username"
              type="text"
              value={userDeets.username}
              onChange={(e) =>
                setUserDeets((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-lable">Email:</FormLabel>{" "}
            <Input
              id="email"
              type="email"
              value={userDeets.email}
              onChange={(e) =>
                setUserDeets((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-lable">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={userDeets.password}
              onChange={(e) =>
                setUserDeets((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-lable">Confirm Password</FormLabel>{" "}
            <Input
              id="confirmPassword"
              type="password"
              value={userDeets.confirmPassword}
              onChange={(e) =>
                setUserDeets((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </FormControl>

          <Box>
            <Button
              type="submit"
              className="signup-button"
            >
              SignUp!
            </Button>
          </Box>
          <Box textAlign="center" >
            <Button
              onClick={() => navigate("/login-page")}
              className="signup-button"
            >
              Already a User
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
