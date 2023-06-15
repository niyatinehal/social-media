import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../services/HandlerContext/AuthFunc";
import { Navigate, useNavigate } from "react-router-dom";
import { MainContext } from "../../services/contexts/MainContext";

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const { mainDispatcher, mainState } = useContext(MainContext);

  const [userDeets, setUserDeets] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); 

  const signupHandler = (e) => {
     e.preventDefault();
     
    const Details = {
      fName: e.target.firstName.value,
      lName: e.target.lastName.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (Details.password !== Details.confirmPassword) {
      console.log("passwords should be same");
    } else {
       signup(Details);

       navigate("/login-page");
    }
  };

  return (
    <div>
      <div>
        <h1>K-Verse</h1>
        <h2>Sign-up</h2>
        <form onSubmit={(e) => signupHandler(e)}>
          <p>First Name</p>
          <input
            id="firstName"
            type="text"
            value={userDeets.firstName}
            required
            onChange={(e) =>
              setUserDeets((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
          <p>Last Name</p>
          <input
            id="lastName"
            type="text"
            value={userDeets.lastName}
            onChange={(e) =>
              setUserDeets((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <p>User Name</p>
          <input
            id="username"
            type="text"
            value={userDeets.username}
            onChange={(e) =>
              setUserDeets((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <p>Email</p>
          <input
            id="email"
            type="email"
            value={userDeets.email}
            onChange={(e) =>
              setUserDeets((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <p>Password</p>
          <input
            id="password"
            type="password"
            value={userDeets.password}
            onChange={(e) =>
              setUserDeets((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <p>Confirm Password</p>
          <input
            id="confirmPassword"
            type="password"
            value={userDeets.confirmPassword}
            onChange={(e) =>
              setUserDeets((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <div>
            <button type="submit">SignUp!</button>
          </div>
        </form>
        <div>
          <button onClick={()=>navigate("/login-page")}>Already a User</button>
        </div>
      </div>
    </div>
  );
};
