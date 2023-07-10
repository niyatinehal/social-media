import React, { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import "./bookmark.css";
import { SideBar } from "../../components/SideBar/Sidebar";
import { Box } from "@chakra-ui/react";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "framer-motion";
import { Navbar } from "../../components/Navbar/Navbar";

export const Bookmark = () => {
  const { mainState } = useContext(MainContext);
  const {
    removeBookmark,
    checkBookmark,
    likeHandler,
    dislikeHandler,
    checkLikes,
  } = useContext(PostContext);
  const { avatar } = useContext(UserContext);

  const bookmarkData = [...mainState.bookMark];

  const removeHandler = (postId) => { 
    if (checkBookmark().includes(postId)) {
      removeBookmark(postId);
    }
  };

  console.log(bookmarkData);
  return (
    <Box className="bookmark">
    <Navbar/>
      <SideBar />
      <Box className="bookmark-content">
        {bookmarkData.length > 0 ? (
          <Box className="bookmark-posts-list">
            {bookmarkData.map((bmark) => (
              <li>
                <Box className="bookmark-user">
                  <Box className="bookmark-user-info">
                    <img src={avatar(bmark.username)} className="avatar" />
                    <h3>
                      {bmark.firstName} {bmark.lastName}
                      <p>
                        @{bmark.username}
                        <p className="date">
                          {new Date(bmark.createdAt).toDateString()}
                        </p>
                      </p>
                    </h3>
                  </Box>
                </Box>

                <p className="bookmark-post-content">{bmark.content}</p>
                <img src={bmark.img} alt="" />
                <div className="button">
                  <button onClick={() => removeHandler(bmark._id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#e63d3d" }}
                      size="2xl"
                    />
                  </button>{" "}
                  <button
                    onClick={() => {
                      checkLikes()?.includes(bmark._id) === true
                        ? dislikeHandler(bmark._id)
                        : likeHandler(bmark._id);
                    }}
                    bg="none"
                    border="none"
                    style={{width:"200px"}}
                  >
                    {checkLikes()?.includes(bmark._id) === true ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "black" }}
                        size="2xl"
                      />
                    ) : (
                      <div className="like-count"><FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "white" }}
                        size="2xl"
                      />
                      <p>{" "}{bmark.likes.likeCount}</p></div>
                      
                    )}
                  </button>
                </div>

                <hr />
              </li>
            ))}
          </Box>
        ) : (
          <Box className="no-bookmarks">
            <h3>No bookMarks added !!!</h3>
          </Box>
        )}
      </Box>
      <Suggestions />
    </Box>
  );
};
