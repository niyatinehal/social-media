import React, { useContext, useState } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { SideBar } from "../../components/SideBar/Sidebar";
import "./Home.css";
import { FollowContext } from "../../services/HandlerContext/FollowFunc";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import {
  Box,
  Button,
  Input,
  Textarea,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  border,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEdit,
  faHeart,
  faPaperPlane,
  faTrashAlt,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { mainState, loggedInUser, mainDispatcher } = useContext(MainContext);
  const {
    likeHandler,
    dislikeHandler,
    checkLikes,
    checkBookmark,
    initialBookmark,
    bookmarkAdded,
    removeBookmark,
    uploadNewPost,
    editPost,
    deletePost,
  } = useContext(PostContext);
  const nav=useNavigate()

  const { setFollowing } = useContext(FollowContext);

  const [editDetails, setDetails] = useState("");
  const [editImage, setImage] = useState();
  const [editObject, setObject] = useState({});
  const [show, setShow] = useState(false);
  const [comShow, setComShow] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [sort, setSort] = useState(false);

  const postCreate = [...mainState.posts].filter(
    (post) => post.username === loggedInUser.username
  );

  // postFOllow
  const postFollow = [...mainState.posts].filter((post) =>
    mainState.following.find((user) => user === post.username)
  );
  //addPost
  const postData = [...postCreate];
  const postDetails = {
    img: "",
    content: "",
  };
  const checkPost = () => {
    uploadNewPost(postDetails);
  };

  //addComment
  const handleComment = (postId) => {
    const comment = {
      content: commentContent,
      author: loggedInUser.username,
    };
    mainDispatcher({ type: "addComments", payload: { comment, postId } });
    setCommentContent("");
  };
  const saveEditPost = () => {
    const edits = { ...editObject, img: editImage, content: editDetails };
    setShow(!show);
    editPost(edits);
  };

  const trendingHandler = () => {
    setSort(false);
  };

  const latestHandler = () => {
    setSort(true);
  };
  const sorted = sort
    ? postData.sort((a, b) => b.likes.likeCount - a.likes.likeCount)
    : postData;

  const homePage = () => {};
  return (
    <Box className="home">
      <SideBar />
      <Box className="home-content">
        <Box className="create-post">
          <Textarea
            placeholder="What's on your mind"
            className="text-area"
            onChange={(e) => (postDetails.content = e.target.value)}
          ></Textarea>

          {/* <label>
            Choose Image
            <Input
              onChange={(e) => (postDetails.img = e.target.files[0])}
              type="file"
              className="input"
            />
          </label> */}
          <Button
            onClick={() => checkPost()}
            className="button"
            bg="none"
            border="none"
          >

          <p className="post"> POST <FontAwesomeIcon icon={faPaperPlane} size="xs" /></p>
            
          </Button>
        </Box>
        <Box className="button-trending-sorting">
          <Button onClick={() => trendingHandler()}>Latest</Button>
          <Button onClick={() => latestHandler()}>Trending</Button>
        </Box>
        <Box className="posts">
          {postData?.map((post) => (
            <Box key={post.id} className="posts-list">
              <li key={post.id}>
                <Box className="user-info">
                  <Box className="user-info-hide-icon" onClick={()=>nav(`/profile-details/${post.username}`)}>
                    <img src={loggedInUser.avatar} alt="" className="avatar" />

                    <h3>
                      {post.firstName} {post.lastName}
                      <p>
                        @{post.username}
                        <p className="date">
                          {new Date(post.createdAt).toDateString()}
                        </p>
                      </p>
                    </h3>
                  </Box>
                  <Menu>
                    <MenuButton as={Button} bg="none" border="none">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        size="2xl"
                        style={{ color: "#ddd4cc" }}
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <Button
                          onClick={(e) => {
                            setShow(!show);
                            setObject(post);
                            setDetails(post.content);
                            setImage(post.img);
                          }}
                          bg="none"
                          border="none"
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="2xl"
                            style={{ color: "#ddd4cc" }}
                          />
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <Button
                          onClick={() => deletePost(post._id)}
                          bg="none"
                          border="none"
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            size="2xl"
                            style={{ color: "#ddd4cc" }}
                          />
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <Box className="edit-post">
                  <Box style={editObject===post?{ display: show ? "block" : "none" } :{display:"none"}}>
                  
                    <h3>Edit Post</h3>
                    <Box className="input-box">
                      <Input
                        className="input"
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={editDetails}
                      />
                      <Button
                        onClick={() => setImage(null)}
                        className="edit-btn"
                      >
                        Remove Image
                      </Button>
                    </Box>

                    <label className="edit-lable">
                      <p>
                        choose New Image{" "}
                        <Input
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </p>
                    </label>
                    <Box>
                      <Button
                        className="edit-btn"
                        onClick={() => saveEditPost()}
                      >
                        Save
                      </Button>
                      <Button
                        className="edit-btn"
                        onClick={() => setShow(!show)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <p className="post-content">{post.content}</p>

                <img src={post.img} alt="" className="posted-img" />

                <Box>
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
                  </Button>{" "}
                  {post.likes.likeCount}{" "}
                  <Button
                    onClick={() => {
                      checkBookmark()?.includes(post._id) === true
                        ? removeBookmark(post._id)
                        : bookmarkAdded(post._id);
                    }}
                    bg="none"
                    border="none"
                  >
                    {checkBookmark()?.includes(post._id) ? (
                      <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "#afa193" }}
                        size="2xl"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "white" }}
                        size="2xl"
                      />
                    )}
                  </Button>
                </Box>
              </li>
              <hr></hr>
            </Box>
          ))}
        </Box>
      </Box>
      <Suggestions />
    </Box>
  );
};
