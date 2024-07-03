import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AuthenticationPage from "../pages/Authentication";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import Navbar from "../components/Navbar";
import UserVideos from "../pages/UserVideos";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<AuthenticationPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/videos/:id" element={<UserVideos />} />
      </Routes>
    </>
  );
}

export default App;
