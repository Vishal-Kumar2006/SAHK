import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/user/login");
    }
  }, []);

  const handleLogout = () => {
    axios
      .get(`${API_URL}/user/logout`, { withCredentials: true })
      .then((response) => {
        setUser(null);
        navigate("/user/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Profile">
      {user ? (
        <div className="user-info">
          <h4>Welcome to Profile Page</h4>
          <img src={user.image} alt="User Image" id="user-Image" />
          <h3 id="user-name">{user.name}</h3>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>No User Found</div>
      )}
    </div>
  );
};

export default Profile;
