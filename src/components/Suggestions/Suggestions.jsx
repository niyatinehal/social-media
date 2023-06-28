import React from "react";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { FollowContext } from "../../services/HandlerContext/FollowFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { Box, VStack, Text, Button, useColorModeValue } from "@chakra-ui/react";
import "./suggestions.css";

export const Suggestions = () => {
  const { mainState } = useContext(MainContext);
  const { setFollowing, setUnfollow } = useContext(FollowContext);
  const { existingFollower } = useContext(UserContext);
  const buttonColorScheme = useColorModeValue("blue", "teal");

  return (
    <Box className="suggestions-container">
      <Box className="suggestions-block">
        <h2>Suggested Users</h2>
        {mainState.existingUser.map((user) => (
          <Box key={user._id} className="suggestions-box">
            <img src={user.avatar} alt="logo" />
            <Text className="suggestions-name" >
              {user.firstName} {user.lastName}<p>@{user.username}</p>
            </Text>

            <Button
              className="suggestions-button"
              colorScheme={buttonColorScheme}
              onClick={() =>
                existingFollower(user.username)
                  ? setUnfollow(user._id)
                  : setFollowing(user._id)
              }
            >
              {existingFollower(user.username) ? "unfollow" : "follow"}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
