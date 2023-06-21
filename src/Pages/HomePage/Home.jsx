import React, { useContext, useState } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { SideBar } from "../../components/SideBar/Sidebar";
import "./Home.css";

export const Home = () => {
  const { mainState, loggedInUser } = useContext(MainContext);
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

  const [editDetails, setDetails] = useState("");
  const [editImage, setImage] = useState();
  const [editObject, setObject] = useState({});
  const [show, setShow] = useState(false);

  const postCreate = [...mainState.posts].filter(
    (post) => post.username === loggedInUser.username
  );

  //add postFOllow
  const postFollow = [...mainState.posts].filter((post) =>
    mainState.following.find((user) => user === post.username)
  );

  const postData = [...postCreate];
  const postDetails = {
    img: "",
    content: "",
  };
  const checkPost = () => {
    uploadNewPost(postDetails);
    console.log(postDetails);
  };

  const saveEditPost = () => {
    const edits = { ...editObject, img: editImage, content: editDetails };
    setShow(!show);
    editPost(edits);
  };
  return (
    <div className="home">
      <SideBar />
      <div className="home-content">
        <div className="create-post">
          <textarea
            placeholder="whats on your mind"
            onChange={(e) => (postDetails.content = e.target.value)}
          ></textarea>
          <label>
            Choose Image
            <input
              onChange={(e) => (postDetails.img = e.target.files[0])}
              type="file"
            />
          </label>
          <button onClick={() => checkPost()}>Post</button>
        </div>
        <div>
          {postData?.map((post) => (
            <div key={post.id}>
              <li key={post.id}>
                <img src={loggedInUser.avatar} alt="" />
                <h3>{post.firstName}</h3>
                {post.content}
                <button
                  onClick={(e) => {
                    setShow(!show);
                    setObject(post);
                    setDetails(post.content);
                    setImage(post.img);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deletePost(post._id)}>Delete</button>
                <div className="edit-post">
                  <div style={{ display: show ? "block" : "none" }}>
                    <h1>Edit Post</h1>
                    <input
                      type="text"
                      onChange={(e) => setDetails(e.target.value)}
                      value={editDetails}
                    />
                    <button onClick={() => setImage(null)}>Remove Image</button>
                    <label>
                      choose New Image
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                    <div>
                      <button onClick={() => saveEditPost()}>Save</button>
                      <button onClick={() => setShow(!show)}>Cancel</button>
                    </div>
                  </div>
                </div>
                <p>
                  {/* <button
                  onClick={() => {checkLikes()?.includes(post._id) === true
                      ? dislikeHandler(post._id)
                      : likeHandler(post._id);}}
                > */}
                  <button
                    onClick={() => {
                      checkLikes()?.includes(post._id) === true
                        ? dislikeHandler(post._id)
                        : likeHandler(post._id);
                    }}
                  >
                    {checkLikes()?.includes(post._id) === true
                      ? "dislike"
                      : "like"}
                  </button>
                  {post.likes.likeCount}
                </p>
                <p>
                  <button
                    onClick={() => {
                      checkBookmark()?.includes(post._id) === true
                        ? removeBookmark(post._id)
                        : bookmarkAdded(post._id);
                    }}
                  >
                    {checkBookmark()?.includes(post._id)
                      ? "remove bookmark"
                      : "add to bookmark"}
                  </button>
                </p>
              </li>
            </div>
          ))}
        </div>
      </div>
      <div className="home-suggestions">
        <h3>who to follow?</h3>
        {mainState?.existingUser?.map((user) => (
          <div key={user.id}>
            <li>
              <strong>{user.username}</strong>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
