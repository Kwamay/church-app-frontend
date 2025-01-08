import React, { useState } from "react";
import { Link } from "react-router-dom";
// import google from "../images/google.png";
// import facebook from "../images/facebook.png";
// import github from "../images/github.png";
// import linkedin from "../images/linkedin.png";
import "../css/signup.css";

const SignUpPage = () => {
  // State variables for form fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <section className="signup-page">
        <div className="rectangle-shape">
          <div className="left-rec-shape">
            <h1 className="sign-in-text">Creat Account</h1>
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
            <p className="left-small-text">or use your email for registration</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="name"
                  id="name"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="name"
                  id="name"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="left-btn-container">
                <Link type="submit" to="/signup" className="l-sign-in-btn">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>

          <div className="right-rectangle-shape">
            <h1 className="b-text">Welcome Back!</h1>
            <p className="r-small-text">
              Enter your personal account to access the website app
            </p>
            <Link to="/" className="r-sign-up-btn">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
