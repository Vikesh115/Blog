import { Link } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className=" top-0 left-0 w-full bg-blue-500 text-white p-4 flex justify-between items-center shadow-lg z-10">
      <Link
        to="/"
        className="text-lg font-bold hover:text-gray-200 transition duration-200"
      >
        Blog
      </Link>
      <div className="flex gap-4">
        {handleLogout ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-orange-950 text-white px-4 py-2 rounded-lg shadow-md hover:bg-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-orange-950 text-white px-4 py-2 rounded-lg shadow-md hover:bg-black "
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-orange-950 text-white px-4 py-2 rounded-lg shadow-md hover:bg-black "
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
