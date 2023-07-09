import React from "react";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { useNavigate } from "react-router-dom";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import { SideBar } from "../../components/SideBar/Sidebar";
import "./explore.css";
import { Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";

export const Explore = () => {
  const { mainState, loggedInUser } = useContext(MainContext);
  const {
    likeHandler,
    dislikeHandler,
    checkLikes,
    initialBookmark,
    bookmarkAdded,
    checkBookmark,
    removeBookmark,
  } = useContext(PostContext);

  const navigate = useNavigate();

  const { avatar } = useContext(UserContext);
  const exploreData = [...mainState.posts];
  console.log(exploreData.map((data) => data.username));
  return (
    <Box className="explore">
      <SideBar />
      <Box className="explore-post">
        {exploreData.map((post) => (
          <Box key={post.id} className="explore-posts-list">
            <li key={post.id}>
              <Box className="explore-user-info">
                <Box className="explore-user-info-box">
                  <img src={avatar(post.username)} alt="" className="avatar" />{" "}
                  <h3
                    onClick={() =>
                      navigate(`/profile-details/${post.username}`)
                    }
                  >
                    {post.firstName} {post.lastName}
                    <p>
                      @{post.username}
                      <p className="date">
                        {new Date(post.createdAt).toDateString()}
                      </p>
                    </p>
                  </h3>
                </Box>
              </Box>

              <p
                // onClick={() => navigate(`/post-details/${post._id}`)}
                className="explore-post-content"
              >
                {post.content}
              </p>

              <img src={post.img} />
              <Box className="button">
                <Button
                  onClick={() => {
                    checkLikes()?.includes(post._id) === true
                      ? dislikeHandler(post._id)
                      : likeHandler(post._id);
                  }}
                  bg="none"
                    border="none"
                >
                  {checkLikes()?.includes(post._id) === true ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: "#afa193" }}
                      size="2xl"
                    />
                  ) : (
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "white" }}
                        size="2xl"
                      />
                  )}
                </Button>
                
                <Button
                  onClick={() => {
                    checkBookmark()?.includes(post._id) === true
                      ? removeBookmark(post._id)
                      : bookmarkAdded(post._id);
                  }}
                   bg="none"
                    border="none"
                >
                  {checkBookmark()?.includes(post._id)
                    ? <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "#afa193" }}
                        size="2xl"
                      />
                    : <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "white" }}
                        size="2xl"
                      />}
                </Button>
              </Box>
            </li>
            <hr />
          </Box>
        ))}
      </Box>
      <Suggestions />
    </Box>
  );
};
