import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redaux/actions/action";
import "../css/signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // If user tried to access a protected page → store that route
  const redirectPath = location.state?.from || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await dispatch(loginUser({ email, password }));

      // ---- FIX: Proper token check ----
      const token = response?.payload?.token || response?.payload?.data?.token;

      if (!token) {
        setMessage({
          type: "error",
          text: "Invalid login credentials. Try again.",
        });
        return;
      }

      localStorage.setItem("token", token);

      setMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      });

      setTimeout(() => navigate(redirectPath), 800);
    } catch (err) {
      console.error("Login error:", err);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div>
      {/* ----------- Fancy Notification ----------- */}
      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "14px 20px",
            borderRadius: "8px",
            zIndex: 1000,
            color: "#fff",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            background:
              message.type === "success"
                ? "linear-gradient(120deg, #22c55e, #15803d)"
                : "linear-gradient(120deg, #ef4444, #b91c1c)",
            animation: "slideIn 0.4s ease-out",
          }}
        >
          {message.text}
        </div>
      )}

      <section className="login-page">
        <div className="rec-shape">
          <div className="left-rec-shape">
            <h1 className="sign-in-text">Sign In</h1>
            <p className="left-small-text">or use your email & password</p>

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
                Forgot Your{" "}
                <Link to="/forgot-password" className="pass-underline">
                  Password?
                </Link>
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
              Register with your personal details to use all site features
            </p>
            <Link to="/signup" className="right-sign-up-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
