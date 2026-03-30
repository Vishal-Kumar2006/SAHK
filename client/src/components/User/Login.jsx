import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/user/log-in`, userData, {
        withCredentials: true,
      });

      setUser(response.data.user);
      alert("User logged In sucessfully.");
      navigate("/user/profile");
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 404) {
        alert("Error: User not Exist with this email");
      } else {
        alert("Error: Internal Srever Error!!");
      }
    }
  };

  const signUpRedirect = () => {
    navigate("/user/signup");
  };
  return (
    <div className="Login">
      <h3>Login to SAHK</h3>
      <form>
        <label htmlFor="email">Ente Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="input"
          autoComplete="email"
          value={userData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Ente Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="input"
          autoComplete="password"
          onChange={handleChange}
          value={userData.password}
        />

        <button onClick={handleSubmit}>Log In</button>
      </form>

      <button onClick={signUpRedirect}> Create New Account </button>
    </div>
  );
};

export default Login;
