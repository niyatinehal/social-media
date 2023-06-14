import React, { useContext, useState } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";

export const Home = () => {
  const { mainState } = useContext(MainContext);
  const { likeHandler, dislikeHandler, checkLikes } = useContext(PostContext);
  const [liked, setLiked] = useState(false);

  const like = (postId, posts) => {
    const findPost = posts?.filter((post) => post._id === postId);
    findPost ? setLiked(!liked) : setLiked(liked);
  };

  return (
    <div>
      <div>
        {mainState?.posts.map((post) => (
          <div key={post.id}>
            <li key={post.id}>
              <h3>{post.username}</h3>
              {post.content}
              <p>
                <button
                  onClick={() => {
                    checkLikes()?.includes(post._id) === true
                      ? dislikeHandler(post._id)
                      : likeHandler(post._id);
                  }}
                >
                  like
                </button>
                {post.likes.likeCount}
              </p>
              <p>
                <button>Bookmark</button>
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
