import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
import { MainContext } from "../../services/contexts/MainContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { LoginHandler } = useContext(AuthContext);
  const { mainState } = useContext(MainContext);

  const [userData, setUserData] = useState({username:'',password:''});
//   console.log("signed In user", mainState.user, "userDATA", userData);

  const guestUser = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };

  const login = (e) => {
    e.preventDefault();
    if (!userData.username || !userData.password) {
      console.log("invalid input");
    } else {
      console.log("logged in data", userData);
      LoginHandler(userData);
      navigate("/user-profile");
    }
  };

  const guestLogin = (e) => {
    e.preventDefault();
    setUserData(guestUser);
    LoginHandler(guestUser);
    navigate("/user-profile");
  };

  return (
    <div>
      <div>
        <h1>K-Verse</h1>
        <h2>Login</h2>
        <form>
          <div>
            <p>Username: </p>
            <input
              id="username"
              type="text"
              required
              value={userData.username}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
            <p>Password: </p>
            <input
              id="password"
              type="password"
              required
              value={userData.password}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
            <div>
              <button onClick={login}>Login</button>
            </div>
            <div>
              <button onClick={guestLogin}>Guest Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
