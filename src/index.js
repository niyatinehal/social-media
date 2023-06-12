import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {mockman} from "mockman-js"

import { makeServer } from "./server";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./services/HandlerContext/AuthFunc";
import { MainContextProvider } from "./services/contexts/MainContext";
import { PostsContextProvider } from "./services/HandlerContext/PostsFunc";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <MainContextProvider>
        <AuthProvider>
          <PostsContextProvider>
            <App />
          </PostsContextProvider>
        </AuthProvider>
      </MainContextProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
