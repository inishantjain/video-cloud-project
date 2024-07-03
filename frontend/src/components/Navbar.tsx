import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow ">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize ">
        <Link
          to="/"
          className="text-gray-800 transition-colors duration-300 transform border-b-2 border-blue-500 mx-1.5 sm:mx-6"
        >
          Profile
        </Link>

        <Link
          to="feed"
          className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform  hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Feed
        </Link>
      </div>
    </nav>
  );
}
