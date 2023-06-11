import React, { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";


export const Home = () => {
  const { mainState } = useContext(MainContext);
  const {postState,postDispatch,likeHandler }=useContext(PostContext)
  console.log("home", mainState.posts);
  // const likeHandler=()=>{
  // console.log()
  // }
  
  return (
    <div>
      <div>
        {mainState?.posts.map((post) => (
          <div>
            <li key={post.id}>
            <h3>{post.username}</h3>
              {post.content}
              <p>
                <button onClick={likeHandler}>Likes</button>
                {post.likes.likeCount}
              </p>
              <p><button>Bookmark</button></p>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};
