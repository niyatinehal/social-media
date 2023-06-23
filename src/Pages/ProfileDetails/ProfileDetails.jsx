import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../services/contexts/MainContext";
import { FollowContext } from "../../services/HandlerContext/FollowFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { useState } from "react";
import { Suggestions } from "../../components/Suggestions/Suggestions";

export const ProfileDetails = () => {
  const { profileId } = useParams();
  const { mainState } = useContext(MainContext);
  const { setFollowing, setUnfollow } = useContext(FollowContext);
  const { editedProf, existingFollower } = useContext(UserContext);
  const profileData =
    profileId === mainState.loggedInUser.username
      ? mainState.loggedInUser
      : mainState.existingUser.find((user) => user.username === profileId);

      console.log(profileData)

  const postData = mainState.posts.filter(
    (post) => post.username === profileId
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
  const [portfolio, setPortfolio] = useState(profileData.portfolio);
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
    <section>
      <div style={{ display: edit ? "none" : "block" }}>
        <div>
          <label>
            Choose Avatar
            <input type="file" onChange={(e) => setImage(e.target.file[0])} />
          </label>
          <div>
            <p>Bio</p>
            <input onChange={(e) => setInput(e.target.value)} value={input} />
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
                  profileData.username === mainState.loggedInUser.username
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
              {existingFollower(profileData.username) ? "unfollow" : "follow"}
            </button>
          </div>
        </div>
      </div>
      <hr />
      {postData.map((post) => (
        <ul>
        {console.log(profileData)}
          <li>{post.username}</li>
          <li>{post.content}</li>
          <li>{input}</li>
          <li>{portfolio}</li>
          <li>{post.img}</li>
          <button
            onClick={() => {
              checkLikes()?.includes(post._id) === true
                ? dislikeHandler(post._id)
                : likeHandler(post._id);
            }}
          >
            {checkLikes()?.includes(post._id) === true ? "dislike" : "like"}
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
              ? "remove bookmark"
              : "add to bookmark"}
          </button>
          <button onClick={()=>setshowEdit(!edit)}>Edit</button>
        </ul>
      ))}
      <Suggestions/>
    </section>
  );
};
