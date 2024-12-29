import React, { useState } from "react";
import { Link } from "react-router-dom";
// import google from "../images/google.png";
// import facebook from "../images/facebook.png";
// import github from "../images/github.png";
// import linkedin from "../images/linkedin.png";
import "../css/signin.css";

function Signin() {
  // State to hold the input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to authenticate the user, like sending a request to a server
    console.log("Username:", username);
    console.log("Password:", password);
    // For demonstration purposes, let's just clear the input fields after submission
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <section className="login-page">
        <div className="rec-shape">
          <div className="left-rec-shape">
            <h1 className="sign-in-text">Sign In</h1>
            {/* <div className="social-icons">
              <a href="https://google.com" className="icons-link">
                <img src={google} alt="google" className="icons-image" />
              </a>
              <a href="https://facebook.com" className="icons-link">
                <img src={facebook} alt="facebook" className="icons-image" />
              </a>
              <a href="https://github.com" className="icons-link">
                <img src={github} alt="github" className="icons-image" />
              </a>
              <a href="https://linkedin.com" className="icons-link">
                <img src={linkedin} alt="linkedin" className="icons-image" />
              </a>
            </div> */}
            <p className="left-small-text">or use your email password</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="forgot-pass">
                Forgot Your <Link type="submit" to="/forgot-password" className="pass-underline">Password?</Link>
              </p>
              <div className="left-btn-container">
              <Link type="submit" to="/" className="left-sign-in-btn">
                Sign In
              </Link>
              </div>
            </form>
          </div>

          <div className="right-rec-shape">
            <h1 className="big-text">Hello, Friend!</h1>
            <p className="right-small-text">
              Register with your personal details to use all of site features
            </p>
            <Link to="/signup" className="right-sign-up-btn">Sign Up</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
