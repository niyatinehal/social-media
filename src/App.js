import logo from "./logo.svg";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";

import { SignupPage } from "./Pages/Signup/SignupPage";
import { Home } from "./Pages/HomePage/Home";
import { Bookmark } from "./Pages/BookmarkPage/Bookmark";
import { Explore } from "./Pages/ExplorePage/Explore";
import { LoginPage } from "./Pages/Login/LoginPage";
import { UserProfile } from "./Pages/User/UserProfile";
import { RequireAuth } from "./utils/RequireAuth";
import { useContext } from "react";
import { MainContext } from "./services/contexts/MainContext";
import { PostDetails } from "./Pages/Post/PostDetails";
import { ProfileDetails } from "./Pages/ProfileDetail/ProfileDetails";

function App() {
  const { mainState } = useContext(MainContext);
  return (
    <div className="App">

    {/* <Navbar/> */}
     {/* <SideBar /> */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="/bookmark" element={<RequireAuth isLoggedIn={mainState?.isLoggedIn}>
              <Bookmark />
            </RequireAuth>} />
        <Route path="/explore" element={<RequireAuth isLoggedIn={mainState?.isLoggedIn}>
              <Explore />
            </RequireAuth>} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route
          path="/user-profile"
          element={
            <RequireAuth isLoggedIn={mainState?.isLoggedIn}>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route path="/post-details/:postId" element={<PostDetails/>}/>
        <Route path="/profile-details/:profileId" element={<ProfileDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
