import React from "react";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { FollowContext } from "../../services/HandlerContext/FollowFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { Box, VStack,Text, Button,useColorModeValue } from "@chakra-ui/react";

export const Suggestions = () => {
  const { mainState } = useContext(MainContext);
  const { setFollowing, setUnfollow } = useContext(FollowContext);
  const { existingFollower } = useContext(UserContext);
  const buttonColorScheme = useColorModeValue("blue", "teal");

  return (
    <Box className="suggestions-container">
      <VStack align="start" spacing={4}>
        <h1>Suggested Users</h1>
        {mainState.existingUser.map((user) => (
          <Box key={user._id} className="suggestions-box" borderWidth="1px"
            rounded="md"
            p={4}>
            <Text className="suggestions-name" fontWeight="bold">{user.username}</Text>
            <Button
            className="suggestions-button"
             colorScheme={buttonColorScheme}
              mt={2}
              isFullWidth
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
      </VStack>
    </Box>
  );
};
