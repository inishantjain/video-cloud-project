import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow border-b">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize ">
        <Link
          to="/"
          className="border-b-2 border-transparent text-gray-800 transition-colors duration-300 transform hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Profile
        </Link>

        <Link
          to="feed"
          className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Feed
        </Link>
        {user && (
          <div>
            <button
              className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
              onClick={logout}
            >
              log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
