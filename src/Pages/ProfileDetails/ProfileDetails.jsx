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
import {Home} from "../HomePage/Home"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";

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

  // console.log(mainState.existingUser.find((user)=>user.username===profileId))
  console.log(
    profileId === mainState?.loggedInUser.username
      ? mainState.loggedInUser
      : mainState.existingUser
  );
  const user=mainState.existingUser.find((user)=>user.username===profileId);
  console.log("!!!!",mainState.existingUser);
  console.log("***",user)

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

  console.log("$$$", portfolio);

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
  return (
    <div className="profile-details">
      <SideBar />
      <section className="profile-post">
      
        
          <div>
            <div className="profile-user">
              <img src={avatar(user.username)} className="profile-avatar" alt="" />
              <h3>
                {user.firstName} {user.lastName}
                <p>
                  @{user.username}
                </p>
              </h3>
            </div>

            <h3 className="bio">{user.bio}</h3>
            <p className="portfolio">
              <a href={user.website}></a>
              {user.website}
            </p>
            <hr />
          </div>
        {postData.map((post) => (
          <div className="profile-post-list">
            {/* <div className="profile-user">
              <img src={avatar(post.username)} className="avatar" alt="" />
              <h3>
                {post.firstName} {post.lastName}
                <p>
                  @{post.username}
                  <p className="date">
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </p>
              </h3>
            </div>

            <h3 className="bio">Bio: {input}</h3>
            <p className="portfolio">
              <a href={portfolio}></a>
              {portfolio}
            </p>
            <hr /> */}

            <div className="explore-user-info-box">
              <img
                src={avatar(post.username)}
                alt=""
                className="avatar"
              />{" "}
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
            <div>
              <button
                onClick={() => {
                  checkLikes()?.includes(post._id) === true
                    ? dislikeHandler(post._id)
                    : likeHandler(post._id);
                }}
              >
                {checkLikes()?.includes(post._id) === true ? <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: "black" }}
                      size="2xl"
                    /> : <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "white" }}
                        size="2xl"
                      />}
              </button>{" "}
              {post.likes.likeCount}{" "}
              <button
                onClick={() => {
                  checkBookmark()?.includes(post._id) === true
                    ? removeBookmark(post._id)
                    : bookmarkAdded(post._id);
                }}
              >
                {checkBookmark()?.includes(post._id)
                  ?<FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "#eabfff" }}
                        size="2xl"
                      />
                  : <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ color: "white" }}
                        size="2xl"
                      />}
              </button>
              {/* <button onClick={() => setshowEdit(!edit)}>Edit</button> */}
              <div style={{ display: edit ? "none" : "block" }}>
                <div>
                  <label>
                    Choose Avatar
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.file[0])}
                    />
                  </label>
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
                  <div>
                    <button onClick={() => setData()}>Save</button>
                    <button onClick={() => setshowEdit(!edit)}>Cancel</button>
                  </div>
                </div>
                <div>
                  <div>
                    <p>{profileData.username}</p>
                    <p>{profileData.bio}</p>
                    {/* <p>{profileData.portfolio}</p> */}
                    <p>hello</p>
                    <p>Followers: {profileData.followers.length}</p>
                    <p>Following: {profileData.following.length}</p>
                    {/* <p>Posts: {profileData.posts.length}</p> */}
                  </div>
                  <div>
                    <button
                      onClick={() => setshowEdit(!edit)}
                      style={{
                        display:
                          profileData.username ===
                          mainState.loggedInUser.username
                            ? "inline"
                            : "none",
                      }}
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() =>
                        existingFollower(profileData.username)
                          ? setUnfollow(profileData._id)
                          : setFollowing(profileData._id)
                      }
                    >
                      {existingFollower(profileData.username)
                        ? "unfollow"
                        : "follow"}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </section>
      <Suggestions />
    </div>
  );
};
