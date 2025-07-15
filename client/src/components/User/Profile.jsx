import axios from "axios";
import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("error Found");
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("https://sahk.onrender.com/user/logout", { withCredentials: true })
      .then((response) => {
        console.log(response);
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
