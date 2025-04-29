import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redaux/actions/action";
import { useDispatch } from "react-redux";

// import google from "../images/google.png";
// import facebook from "../images/facebook.png";
// import github from "../images/github.png";
// import linkedin from "../images/linkedin.png";
import "../css/signup.css";

const SignUpPage = () => {
  // State variables for form fields
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await dispatch(registerUser({ first_name, last_name, email, password }));
      setSuccess("Registration successful! You can now log in.");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div>
      <section className="signup-page">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
        <div className="rectangle-shape">
          <div className="left-rec-shape">
            <h1 className="sign-in-text">Creat Account</h1>
            <p className="left-small-text">or use your email for registration</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="name"
                  id="name"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="name"
                  id="name"
                  placeholder="Last Name"
                  value={last_name}
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
                <button type="submit" to="/signup" className="l-sign-in-btn">
                  Sign Up
                </button>
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
