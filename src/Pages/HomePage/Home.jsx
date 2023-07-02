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
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEdit,
  faHeart,
  faPaperPlane,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

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
    console.log(postDetails);
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

  const latestHandler=()=>{
    setSort(true)
  }
  const sorted= sort
    ?postData.sort((a,b)=>b.likes.likeCount-a.likes.likeCount)
    :postData;
    console.log("sorted",sorted)

  const homePage = () => {};
  return (
    <Box className="home">
      <SideBar />
      <Box className="home-content">
        <Box className="create-post">
          <Textarea
            placeholder="whats on your mind"
            className="text-area"
            onChange={(e) => (postDetails.content = e.target.value)}
          ></Textarea>

          <label>
            Choose Image
            <Input
              onChange={(e) => (postDetails.img = e.target.files[0])}
              type="file"
              className="input"
            />
          </label>
          <Button
            onClick={() => checkPost()}
            className="button"
            bg="none"
            border="none"
          >
            <FontAwesomeIcon icon={faPaperPlane} size="2xl" />
          </Button>
        </Box>
        <Box className="button-trending-sorting">
          <Button onClick={() => trendingHandler()}>Trending</Button>
          <Button onClick={()=>latestHandler()}>Latest</Button>
        </Box>
        <Box className="posts">
          {postData?.map((post) => (
            <Box key={post.id} className="posts-list">
              <li key={post.id}>
                <Box className="user-info">
                  <Box className="user-info-hide-icon">
                    <img src={loggedInUser.avatar} alt="" className="avatar" />

                    <h3>
                      {post.firstName} {post.lastName}
                      <p>
                        @{post.username}
                        <p className="date">
                          {new Date(post.createdAt).toDateString()}{new Date(post.createdAt).toTimeString()}
                        </p>
                        {console.log(new Date(post.createdAt).getMinutes())}
                      </p>
                    </h3>
                  </Box>
                  <Menu>
                    <MenuButton as={Button}>Hide</MenuButton>
                    <MenuList>
                      <MenuItem>
                        <Button
                          onClick={(e) => {
                            setShow(!show);
                            setObject(post);
                            setDetails(post.content);
                            setImage(post.img);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        {" "}
                        <Button onClick={() => deletePost(post._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <p className="post-content">{post.content}</p>
                {console.log("user-info", post)}
                <img src={post.img} alt="" srcset="" className="posted-img" />

                <Box className="edit-post">
                  <Box style={{ display: show ? "block" : "none" }}>
                    <h1>Edit Post</h1>
                    <Input
                      type="text"
                      onChange={(e) => setDetails(e.target.value)}
                      value={editDetails}
                    />
                    <Button onClick={() => setImage(null)}>Remove Image</Button>
                    <label>
                      choose New Image
                      <Input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                    <Box>
                      <Button onClick={() => saveEditPost()}>Save</Button>
                      <Button onClick={() => setShow(!show)}>Cancel</Button>
                    </Box>
                  </Box>
                </Box>
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
                        style={{ color: "#eabfff" }}
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
                        style={{ color: "#eabfff" }}
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
