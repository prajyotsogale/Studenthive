import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // ✅ Checkbox state
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = isChecked ? "host" : "user"; // ✅ Set role dynamically

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://studenthive.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }), // ✅ Send correct role
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or user not registered");
      }

      /* Get data after fetching */
      const loggedIn = await response.json();
      localStorage.setItem("token", loggedIn.token);
      localStorage.setItem("role" , loggedIn.role); 

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        if (loggedIn.role === "host") {
          navigate(`/properties/${loggedIn.user._id}`);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
  <input
    type="checkbox"
    id="roleCheckbox"
    checked={isChecked}
    onChange={(e) => setIsChecked(e.target.checked)} // ✅ Update role on click
  />
  <label htmlFor="roleCheckbox">Login as Host</label>
</div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
