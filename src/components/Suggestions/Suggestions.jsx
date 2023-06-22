import React from "react";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { FollowContext } from "../../services/HandlerContext/FollowFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";

export const Suggestions = () => {
  const { mainState } = useContext(MainContext);
  const { setFollowing, setUnfollow } = useContext(FollowContext);
  const { existingFollower } = useContext(UserContext);

  return (
    <div>
      <section>
        <div>
          <h1>Suggested Users</h1>
          {mainState.existingUser.map((user) => (
            <li key={user._id}>
              <strong>{user.username}</strong>
              <button
                onClick={() =>
                  existingFollower(user.username)
                    ? setUnfollow(user. _id)
                    : setFollowing(user._id)
                }
              >
                {existingFollower(user.username) ? "unfollow" : "follow"}
              </button>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
};
