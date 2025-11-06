import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redaux/actions/action";
import "../css/signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((response) => {
      if (response.payload.data.token) {
        localStorage.setItem("token", response.payload.token);
        navigate("/dashboard");
      }
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <section className="login-page">
        <div className="rec-shape">
          <div className="left-rec-shape">
            <h1 className="sign-in-text">Sign In</h1>
            <p className="left-small-text">or use your email password</p>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="forgot-pass">
                Forgot Your <Link to="/forgot-password" className="pass-underline">Password?</Link>
              </p>
              <div className="left-btn-container">
                <button type="submit" className="left-sign-in-btn">
                  Sign In
                </button>
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
