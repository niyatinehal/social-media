import logo from './logo.svg';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { SignupPage } from './Pages/SignupPage/SignupPage';
import { Navbar } from './components/Navbar';
import { Home } from './Pages/HomePage/Home';
import { Bookmark } from './Pages/BookmarkPage/Bookmark';
import { Explore } from './Pages/ExplorePage/Explore';
import { LikedPage } from './Pages/LikedPage/LikedPage';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { UserProfile } from './Pages/UserProfile/UserProfile';

function App() {
  return (
    <div className="App">
    <Navbar/>

      <Routes>
        <Route path="/landing-page" element={<LandingPage/>}/>
        <Route path="/signup-page" element={<SignupPage/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/bookmark" element={<Bookmark/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/liked" element={<LikedPage/>}/>
        <Route path='/login-page' element={<LoginPage/>}/>
        <Route path='/user-profile' element={<UserProfile/>}/>

      </Routes>
    </div>
  );
}

export default App;
