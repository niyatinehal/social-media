import logo from "./logo.svg";
import "./App.css";
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

function App() {
  const { mainState } = useContext(MainContext);
  return (
    <div className="App">
    <Navbar/>
      <SideBar />

      <Routes>
        <Route
          path="/landing-page"
          element={
            <RequireAuth>
              <LandingPage />
            </RequireAuth>
          }
        />
        <Route path="/signup-page" element={<SignupPage />} />
        <Route path="/" element={<Home />} />
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
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
