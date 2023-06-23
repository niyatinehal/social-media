import React from "react";
import { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { useParams } from "react-router-dom";
import { Suggestions } from "../../components/Suggestions/Suggestions";

export const PostDetails = () => {
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
  const { postId } = useParams();
  console.log(postId);
  const postDetailsData = [...mainState.posts].find(
    (post) => post._id === postId
  );
  console.log([...mainState.posts].find((post)=>post._id===postId));
  console.log([...mainState.posts])

  return (
    <section>
      <div>
        <ul>
          <li>{postDetailsData.username}</li>
          <li><img src={postDetailsData.img} alt="" /> </li>
          <li>{postDetailsData.content}</li>
          <button
            onClick={() => {
              checkLikes()?.includes(postDetailsData._id) === true
                ? dislikeHandler(postDetailsData._id)
                : likeHandler(postDetailsData._id);
            }}
          >
            {" "} 
            {checkLikes()?.includes(postDetailsData._id) === true ? "dislike" : "like"}
          </button>
          <button
            onClick={() => {
              checkBookmark()?.includes(postDetailsData._id) === true
                ? removeBookmark(postDetailsData._id)
                : bookmarkAdded(postDetailsData._id);
            }}
          >
            {checkBookmark()?.includes(postDetailsData._id)
              ? "remove bookmark"
              : "add to bookmark"}
          </button>{" "}
          {postDetailsData.likes.likeCount}{" "}
        </ul>
      </div>
      <Suggestions />
    </section>
  );
};
