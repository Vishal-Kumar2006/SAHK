import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [menubtn, setMenuBtn] = useState(true);

  return (
    <div className="Navbar">
      <div className="logo">
        <h2>SAHK</h2>
      </div>

      <button className="menu-btn" onClick={() => setMenuBtn(!menubtn)}>
        {menubtn ? (
          <IoMenu className="nav-menu" />
        ) : (
          <IoCloseSharp className="nav-menu" />
        )}
      </button>

      <div className={`options ${!menubtn ? "open" : ""}`}>
        {/* Links */}
        <div className="links">
          <Link to="/" onClick={() => setMenuBtn(!menubtn)}>
            Home
          </Link>
          <Link to="/recipes" onClick={() => setMenuBtn(!menubtn)}>
            All Recipes
          </Link>
          {/* <Link to="/fast-food" onClick={() => setMenuBtn(!menubtn)}>
            Fast Food
          </Link>
          <Link to="/fresh-food" onClick={() => setMenuBtn(!menubtn)}>
            Fresh Food
          </Link> */}
          <Link to="/recipes/new" onClick={() => setMenuBtn(!menubtn)}>
            Create Recipe
          </Link>
        </div>

        {/* User Section */}
        <div className="user">
          {loading ? (
            <span className="loading">Loading...</span>
          ) : user ? (
            <>
              <Link to="/user/profile" onClick={() => setMenuBtn(!menubtn)}>
                {user?.image && (
                  <img src={user.image} alt="User" className="user-image" />
                )}
              </Link>
            </>
          ) : (
            <Link to="/user/login" onClick={() => setMenuBtn(!menubtn)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
