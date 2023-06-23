import React from "react";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { UserContext } from "../../services/HandlerContext/UserFunc";
import { useNavigate } from "react-router-dom";
import { Suggestions } from "../../components/Suggestions/Suggestions";

export const Explore = () => {
  const { mainState } = useContext(MainContext);
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

  console.log(exploreData);
  return (
    <div>
      <div>
        {exploreData.map((post) => (
          <li>
            <h3 onClick={()=>navigate(`/profile-details/${post.username}`)}>{post.username}</h3>
            {console.log(post)}
            <p onClick={()=>navigate(`/post-details/${post._id}`)}>{post.content}</p>
            {/* <img src={avatar(post.username)} /> */}
            <button
              onClick={() => {
                checkLikes()?.includes(post._id) === true
                  ? dislikeHandler(post._id)
                  : likeHandler(post._id);
              }}
            >
              {checkLikes()?.includes(post._id) === true ? "dislike" : "like"}
            </button>
            {post.likes.likeCount}

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
          </li>
        ))}
        <Suggestions/>
      </div>
    </div>
  );
};
