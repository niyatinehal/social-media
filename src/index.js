import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./services/HandlerContext/AuthFunc";
import { MainContextProvider } from "./services/contexts/MainContext";
import { PostsContextProvider } from "./services/HandlerContext/PostsFunc";
import { FollowProvider } from "./services/HandlerContext/FollowFunc";
import { UserProvider } from "./services/HandlerContext/UserFunc";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <MainContextProvider>
        <AuthProvider>
          <PostsContextProvider>
            <FollowProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </FollowProvider>
          </PostsContextProvider>
        </AuthProvider>
      </MainContextProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
