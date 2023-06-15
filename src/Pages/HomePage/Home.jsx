import React, { useContext, useState } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";

export const Home = () => {
  const { mainState, loggedInUser } = useContext(MainContext);
  const {
    likeHandler,
    dislikeHandler,
    checkLikes,
    checkBookmark,
    initialBookmark,
    bookmarkAdded,removeBookmark
  } = useContext(PostContext);

  return (
    <div>
      <div>
        {mainState?.posts?.map((post) => (
          <div key={post.id}>
            <li key={post.id}>
              <h3>{post.username}</h3>
              {post.content}
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
                <button onClick={()=>{
                  checkBookmark()?.includes(post._id)===true?removeBookmark(post._id):bookmarkAdded(post._id)
                }}>{checkBookmark()?.includes(post._id)?"remove bookmark" :"add to bookmark"}</button>
              </p>
            </li>
          </div>
        ))}
      </div>
      <div>
        <h3>who to follow?</h3>
        {mainState?.existingUser?.map((user) => (
          <div>
            <li>
              <strong>{user.username}</strong>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
