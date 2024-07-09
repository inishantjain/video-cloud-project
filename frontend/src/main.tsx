import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { VideoPlayerProvider } from "./context/VideoPlayerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoPlayerProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </VideoPlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
