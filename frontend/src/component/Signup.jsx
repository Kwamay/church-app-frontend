import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../redaux/actions/action";
import { useDispatch } from "react-redux";
import "../css/signup.css";

//
// SignUpPage with non-intrusive floating notifications (keeps original layout)
//

const FloatingNotification = ({ id, type, message, onClose }) => {
  // auto dismiss per-notification
  useEffect(() => {
    if (!id) return;
    const t = setTimeout(() => onClose(id), 3500);
    return () => clearTimeout(t);
  }, [id, onClose]);

  if (!message) return null;

  const isError = type === "error";
  const bg = isError ? "rgba(253, 236, 234, 0.98)" : "rgba(231, 247, 238, 0.98)";
  const border = isError ? "1px solid #f5c6cb" : "1px solid #c3e6cb";
  const color = isError ? "#9b1f1f" : "#135e2a";

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 8,
        background: bg,
        color,
        border,
        boxShadow: "0 6px 18px rgba(10,20,30,0.08)",
        minWidth: 280,
        maxWidth: 720,
        fontWeight: 600,
        transform: "translateY(0)",
        animation: "notifFade 360ms ease-out",
      }}
    >
      <div style={{ fontSize: 18 }}>{isError ? "⚠️" : "✅"}</div>
      <div style={{ flex: 1, fontSize: 14 }}>{message}</div>
      <button
        onClick={() => onClose(id)}
        aria-label="close"
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 14,
          color,
          padding: 6,
        }}
      >
        ✕
      </button>

      <style>{`
        @keyframes notifFade {
          from { opacity: 0; transform: translateY(-8px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

const SignUpPage = () => {
  // form state (kept exactly like your original)
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // notifications state (array supports multiple concurrent toasts)
  const [notifications, setNotifications] = useState([]); // { id, type, message }

  // helper to push a notification
  const pushNotif = (type, message) => {
    const id = Date.now() + Math.random();
    setNotifications((s) => [...s, { id, type, message }]);
    return id;
  };

  // helper to remove
  const removeNotif = (id) =>
    setNotifications((s) => s.filter((n) => n.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(
        registerUser({ first_name, last_name, email, password })
      );

      const payload = result?.payload;
      const hasError = !!(result?.error || payload?.error || payload?.detail);

      if (hasError) {
        pushNotif(
          "error",
          payload?.detail || payload?.error || "Registration failed. Try again."
        );
        return;
      }

      // success
      pushNotif("success", "Registration successful! You can now log in.");

      // reset fields (only on success)
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Registration error:", err);
      pushNotif("error", "Unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      {/* Floating notifications container - fixed top center so it doesn't affect layout */}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          top: 18,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          pointerEvents: "none", // allow clicks through empty areas
          padding: "0 12px",
          width: "auto",
        }}
      >
        {notifications.map((n) => (
          <div key={n.id} style={{ pointerEvents: "auto" }}>
            <FloatingNotification
              id={n.id}
              type={n.type}
              message={n.message}
              onClose={removeNotif}
            />
          </div>
        ))}
      </div>

      {/* ======= your original form layout (kept the same classes & structure) ======= */}
      <section className="signup-page">
        <div className="rectangle-shape">
          <div className="left-rec-shape">
            <h1 className="sign-in-text">Creat Account</h1>
            <p className="left-small-text">or use your email for registration</p>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="first_name"
                  placeholder="First Name"
                  value={first_name}
                  required
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  required
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
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
              <div className="left-btn-container">
                <button type="submit" className="l-sign-in-btn">
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
            <Link to="/signin" className="r-sign-up-btn">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
