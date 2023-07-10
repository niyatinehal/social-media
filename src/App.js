import logo from "./logo.svg";
import "./App.css";
// import miragejs from "miragejs"
import { NavLink, Route, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { SignupPage } from "./Pages/SignupPage/SignupPage";
import { SideBar } from "./components/SideBar/Sidebar";
import { Home } from "./Pages/HomePage/Home";
import { Bookmark } from "./Pages/BookmarkPage/Bookmark";
import { Explore } from "./Pages/ExplorePage/Explore";
import { LikedPage } from "./Pages/LikedPage/LikedPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { UserProfile } from "./Pages/UserProfile/UserProfile";
import Mockman from "mockman-js";
import { RequireAuth } from "./utils/RequireAuth";
import { useContext } from "react";
import { MainContext } from "./services/contexts/MainContext";
import { Navbar } from "./components/Navbar/Navbar";
import { PostDetails } from "./Pages/PostDetails/PostDetails";
import { ProfileDetails } from "./Pages/ProfileDetails/ProfileDetails";

function App() {
  const { mainState } = useContext(MainContext);
  return (
    <div className="App">

    {/* <Navbar/> */}
     {/* <SideBar /> */}

      <Routes>
        <Route
          path="/landing-page"
          element={
            <RequireAuth>
              <LandingPage />
            </RequireAuth>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignupPage />} />
        <Route path="/bookmark" element={<RequireAuth isLoggedIn={mainState?.isLoggedIn}>
              <Bookmark />
            </RequireAuth>} />
        <Route path="/explore" element={<RequireAuth isLoggedIn={mainState?.isLoggedIn}>
              <Explore />
            </RequireAuth>} />
        <Route path="/liked" element={<RequireAuth isLoggedIn={mainState?.isLoggedIn}>
              <LikedPage />
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
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
