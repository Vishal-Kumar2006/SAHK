import { useState, useEffect } from "react";
import axios from "axios";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import "./Navbar.css";
import { isCookie } from "react-router-dom";

const Navbar = () => {
  const [menubtn, setMenuBtn] = useState(true);
  const [user, setUser] = useState(null); // store user info if logged in

  useEffect(() => {
    // Check login status on mount
    axios
      .get("https://sahk.onrender.com/user/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user); // user is logged in
      })
      .catch((err) => {
        setUser(null); // not logged in
      });
  }, []);

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
          <a href="/" onClick={() => setMenuBtn(!menubtn)}>
            Home
          </a>
          <a href="/recipes" onClick={() => setMenuBtn(!menubtn)}>
            All Recipies
          </a>
          <a href="/fast-food" onClick={() => setMenuBtn(!menubtn)}>
            Fast Food
          </a>
          <a href="/freash-food" onClick={() => setMenuBtn(!menubtn)}>
            Fresh Food
          </a>
          <a href="/recipes/new" onClick={() => setMenuBtn(!menubtn)}>
            Create Recipe
          </a>
        </div>
        <div className="user">
          {user ? (
            <a href="/user/profile" onClick={() => setMenuBtn(!menubtn)}>
              <img src={user.image} alt="User Image" className="user-image" />
            </a>
          ) : (
            <a href="/user/login" onClick={() => setMenuBtn(!menubtn)}>
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
