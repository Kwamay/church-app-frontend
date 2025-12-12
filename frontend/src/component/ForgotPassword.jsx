import React from "react";
import churchLogo from "../images/church-logo.png";
import "../css/signin.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="forgot-pass-container">
      <img className="church-logo" src={churchLogo} alt="church logo" />

      <div className="forgot-pass-content">
        <h1 className="forgot-pass-text">Forgot Password?</h1>

        <p className="forgot-pass-instruction">
          Enter your primary email and we'll send instructions on how to reset
          your password.
        </p>

        <input placeholder="Email" className="email" />

        <button className="request-instruction-btn">
          Send Request Instructions
        </button>

        <p className="sign-in-instruction">
          You remember your password?
          <Link to="/signin" className="sign-in-link"> Sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
