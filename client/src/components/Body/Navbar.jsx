import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  const [menubtn, setMenuBtn] = useState(true);
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initial render
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Only call API if user is not in localStorage
    if (!user) {
      axios
        .get("https://sahk.onrender.com/user/profile", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem("user");
        });
    }
  }, [user]);

  const handleLogout = () => {
    axios
      .post(
        "https://sahk.onrender.com/user/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => console.error(err));
  };

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
        <div className="links">
          <Link to="/" onClick={() => setMenuBtn(!menubtn)}>
            Home
          </Link>
          <Link to="/recipes" onClick={() => setMenuBtn(!menubtn)}>
            All Recipes
          </Link>
          <Link to="/fast-food" onClick={() => setMenuBtn(!menubtn)}>
            Fast Food
          </Link>
          <Link to="/fresh-food" onClick={() => setMenuBtn(!menubtn)}>
            Fresh Food
          </Link>
          <Link to="/recipes/new" onClick={() => setMenuBtn(!menubtn)}>
            Create Recipe
          </Link>
        </div>
        <div className="user">
          {user ? (
            <>
              <Link to="/user/profile" onClick={() => setMenuBtn(!menubtn)}>
                <img src={user.image} alt="User" className="user-image" />
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
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
