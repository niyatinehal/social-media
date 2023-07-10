import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../services/contexts/MainContext";
import { FollowContext } from "../../services/HandlerContext/FollowFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { useState } from "react";
import { Suggestions } from "../../components/Suggestions/Suggestions";
import "./profileDetails.css";
import { SideBar } from "../../components/SideBar/Sidebar";
import { Home } from "../HomePage/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "../../components/Navbar/Navbar";

export const ProfileDetails = () => {
  const { profileId } = useParams();
  const { mainState } = useContext(MainContext);
  const { setFollowing, setUnfollow } = useContext(FollowContext);
  const { editedProf, existingFollower, avatar } = useContext(UserContext);
  const profileData =
    profileId === mainState?.loggedInUser.username
      ? mainState.loggedInUser
      : mainState?.existingUser.find((user) => user.username === profileId);

  const postData = mainState.posts.filter(
    (post) => post.username === profileId
  );
 

  const user = mainState.existingUser?.find(
    (user) => user.username === profileId
  );
  

  const {
    likeHandler,
    dislikeHandler,
    checkLikes,
    initialBookmark,
    bookmarkAdded,
    checkBookmark,
    removeBookmark,
  } = useContext(PostContext);

  const [edit, setshowEdit] = useState(true);
  const navigate = useNavigate();
  const [input, setInput] = useState(profileData.bio);
  const [portfolio, setPortfolio] = useState(profileData.website);


  const [image, setImage] = useState({});

  const setData = () => {
    const data = {
      ...profileData,
      bio: input,
      portfolio: portfolio,
      img: image,
    };
    editedProf(data);
    setshowEdit(!edit);
  };
  if (!user) {
    return (
      <div>
        <p>No users Selected</p>
      </div>
    );
  }
  return (
    <div className="profile-details">
    <Navbar/>
      <SideBar />
      <section className="profile-post">
        <div>
        <div className="for-edit">
          <div className="profile-user">
            <img
              src={avatar(user?.username)}
              className="profile-avatar"
              alt=""
            />
            <h3>
              {user?.firstName} {user?.lastName}
              <p>@{user?.username}</p>
            </h3>
          </div>
          <div>
             {user._id === mainState.loggedInUser._id ? (
                <button onClick={() => setshowEdit(!edit)}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "ddd4cc" }}
                    size="2xl"
                  />
                </button>
              ) : (
                <p></p>
              )}
              <div style={{ display: edit ? "none" : "block" }} className="edit-profile-post">
              <div>
                <h3>Edit Post</h3>
                <div>
                  <p>Bio</p>
                  <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                  <p>Portfolio</p>
                  <input
                    type="text"
                    onChange={(e) => setPortfolio(e.target.value)}
                    value={portfolio}
                  />
                </div>
                <div >
                  <button onClick={() => setData()} className="edit-post-btn">Save</button>
                  <button onClick={() => setshowEdit(!edit)} className="edit-post-btn">Cancel</button>
                </div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
          
          <div className="follow">
            <p>
              Followers:<p>{user?.followers.length}</p>{" "}
            </p>
            <p>
              Following: <p>{user?.following.length}</p>
            </p>
            <button
              onClick={() =>
                existingFollower(profileData.username)
                  ? setUnfollow(profileData._id)
                  : setFollowing(profileData._id)
              }
              className="follow-btn"
            >
              {existingFollower(profileData.username) ? "UNFOLLOW" : "FOLLOW"}
            </button>
          </div>

          <h3 className="bio">{user?.bio}</h3>
          <p className="portfolio">
            <a href={user?.website}></a>
            {user?.website}
          </p>

          <hr />
        </div>
        {postData.map((post) => (
          <div className="profile-post-list">
            <div className="explore-user-info-box">
              <img src={avatar(post.username)} alt="" className="avatar" />{" "}
              <h3 onClick={() => navigate(`/profile-details/${post.username}`)}>
                {post.firstName} {post.lastName}
                <p>
                  @{post.username}
                  <p className="date">
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </p>
              </h3>
            </div>

            <p className="content">{post.content}</p>

            <img src={post.img} alt="" />
            <div className="button">
              {/* <div className="button">

            </div> */}
              <button
                onClick={() => {
                  checkLikes()?.includes(post._id) === true
                    ? dislikeHandler(post._id)
                    : likeHandler(post._id);
                }}
                className="like"
              >
                {checkLikes()?.includes(post._id) === true ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#afa193" }}
                    size="2xl"
                  />
                ) : (
                  <div className="like-count">
                    <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "white" }}
                    size="2xl"
                  />
                  <p>{" "}{post.likes.likeCount}</p>
                  </div>
                  
                )}
              </button>
              <button
                onClick={() => {
                  checkBookmark()?.includes(post._id) === true
                    ? removeBookmark(post._id)
                    : bookmarkAdded(post._id);
                }}
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
              </button>
             
            </div>
            
            <hr />
          </div>
        ))}
      </section>
      <Suggestions />
    </div>
  );
};
