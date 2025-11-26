import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #2a2a72, #009ffd)",
      padding: "20px",
      textAlign: "center",
    },
    content: {
      color: "white",
      maxWidth: "600px",
      animation: "fadeIn 0.7s ease-in-out",
    },
    title: {
      fontSize: "120px",
      fontWeight: "900",
      margin: "0",
    },
    subtitle: {
      fontSize: "28px",
      marginTop: "-10px",
    },
    text: {
      fontSize: "18px",
      margin: "15px 0 30px",
      opacity: "0.9",
    },
    button: {
      padding: "12px 25px",
      background: "white",
      color: "#2a2a72",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "8px",
      textDecoration: "none",
      transition: "0.3s ease",
      display: "inline-block",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Button hover effect */
          .nf-btn:hover {
            background: #f0f0f0 !important;
            transform: scale(1.05);
          }

          /* Responsive adjustments */
          @media (max-width: 600px) {
            .nf-title { font-size: 80px !important; }
            .nf-subtitle { font-size: 22px !important; }
            .nf-text { font-size: 16px !important; }
          }
        `}
      </style>

      <div style={styles.content}>
        <h1 className="nf-title" style={styles.title}>404</h1>
        <h2 className="nf-subtitle" style={styles.subtitle}>Oops! Page Not Found</h2>
        <p className="nf-text" style={styles.text}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/" className="nf-btn" style={styles.button}>
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
