import React, { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";


export const Home = () => {
  const { mainState } = useContext(MainContext);
  const {postState,postDispatch,likeHandler }=useContext(PostContext)
  console.log("user", mainState.user);
  // const likeHandler=()=>{
  // console.log()
  // }
  
  return (
    <div>
      <div>
        {mainState?.posts.map((post) => (
          <div key={post.id}>
            <li key={post.id}>
            <h3>{post.username}</h3>
              {post.content}
              <p>
                <button onClick={()=>likeHandler(post._id)}> Likes </button>
                 {post.likes.likeCount}
              </p>
              <p><button>Bookmark</button></p>
            </li>
          </div>
        ))}
      </div>
      <div>
        <h3>who to follow?</h3>
        {mainState?.user?.map((user)=>(
          <div>
            <li><strong>{user.username}</strong></li>
          </div>
        ))}
      </div>
    </div>
  );
};
