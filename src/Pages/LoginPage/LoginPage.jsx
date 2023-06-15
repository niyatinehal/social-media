import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
import { MainContext } from "../../services/contexts/MainContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { Login,signup,authState} = useContext(AuthContext);
  const { mainState } = useContext(MainContext);

  const userData={username:"",password:''}

  const guestUser = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!userData.username || !userData.password) {
      console.log("invalid input");
    } else {
      console.log("logged in data", userData);
      Login(userData);    
    }
  };

  const guestLogin = (e) => {
    e.preventDefault();
    // setUserData(guestUser);
    Login(guestUser);
  
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
              //value={userData.username}
              onChange={(e) =>userData.username=e.target.value}
            />
            <p>Password: </p>
            <input
              id="password"
              type="password"
              required
              // value={userData?.password}
              onChange={(e) =>userData.password=e.target.value}
            />
            <div>
              <button onClick={(e)=>loginHandler(e)}>Login</button>
            </div>
            <div> 
              <button onClick={(e)=>guestLogin(e)}>Guest Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
