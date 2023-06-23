import React, { useContext } from "react";
import { MainContext } from "../../services/contexts/MainContext";
import { PostContext } from "../../services/HandlerContext/PostsFunc";
import { Suggestions } from "../../components/Suggestions/Suggestions";

export const Bookmark = () => {
  const { mainState } = useContext(MainContext);
  const{removeBookmark,checkBookmark,likeHandler,
    dislikeHandler,
    checkLikes,}=useContext(PostContext);

    const bookmarkData=[...bookmarkData]
  
  const removeHandler=(postId)=>{
    if(checkBookmark().includes(postId)){
      removeBookmark(postId)
    } 
  }
  return (
    <div>
      <div>
        {bookmarkData ? (
          <div>
            {bookmarkData.map((bmark) => (
              <li>
                <h3>{bmark.username}</h3>
                <p>{bmark.content}</p>
                <button onClick={()=>removeHandler(bmark._id)}>Remove Form Bookmark</button>
                <button  onClick={() => {
                    checkLikes()?.includes(bmark._id) === true
                      ? dislikeHandler(bmark._id)
                      : likeHandler(bmark._id);
                  }}>{checkLikes()?.includes(bmark._id) === true
                    ? "dislike"
                    : "like"}</button>
              </li>
            ))}
          </div>
        ) : (
          <div>
            <h3>No bookMarks added</h3>
          </div>
        )}
      </div>
      <Suggestions/>
    </div>
  );
};
