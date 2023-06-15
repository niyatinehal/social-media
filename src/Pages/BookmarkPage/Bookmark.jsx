import React, { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";

export const Bookmark = () => {
  const { mainState } = useContext(MainContext);
  const{removeBookmark,checkBookmark}=useContext(PostContext)
  console.log(mainState.bookMark);
  const removeHandler=(postId)=>{
    if(checkBookmark().includes(postId)){
      removeBookmark(postId)
    }
  }
  return (
    <div>
      <div>
        {mainState.bookMark ? (
          <div>
            {mainState.bookMark.map((bmark) => (
              <li>
                <h3>{bmark.username}</h3>
                <p>{bmark.content}</p>
                <button onClick={()=>removeHandler(bmark._id)}>Remove Form Bookmark</button>
              </li>
            ))}
          </div>
        ) : (
          <div>
            <h3>No bookMarks added</h3>
          </div>
        )}
      </div>
    </div>
  );
};
