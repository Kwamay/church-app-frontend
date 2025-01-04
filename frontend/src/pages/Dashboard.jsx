import React from "react";
import { Link } from "react-router-dom";
import "../css/dashboard.css";
import { IoInformationCircleOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="App">
      <h1 className="intro">Overview!</h1>
      <p>
        This is where you can view your important information and statistics.
      </p>
     <div className="field-section">
      <div className="field-container">
        <div className="dashboard-field-container">
          <p className="dashboard-field-text">Church Membership Size</p>
          <IoInformationCircleOutline />
        </div>
        <h3 className="counter">13</h3>
      </div>
      <div className="field-container">
        <div className="dashboard-field-container">
          <p className="dashboard-field-text">First Timer</p>
          <IoInformationCircleOutline />
        </div>
        <h3 className="counter">4</h3>
      </div>
      <div className="field-container">
        <div className="dashboard-field-container">
          <p className="dashboard-field-text">SMS Units</p>
          <IoInformationCircleOutline />
        </div>
        <div className="unit-counter-container">
        <h3 className="counter">0.6</h3>
        <button className="dashboard-btn">Buy Units</button>
      </div>
      </div>
    </div>
    <div className="second-field-section">
      <p>Quick Things you can do</p>
      <Link className="second-dashbord-btn" to="/addmembers">Add Member</Link>
      <button className="second-dashbord-btn">Send SMS</button>
      <button className="second-dashbord-btn">Add First Timer</button>
      <button className="second-dashbord-btn">Record Offering</button>
      <button className="second-dashbord-btn">Record Expenses</button>
    </div>
    </div>
  );
};

export default Dashboard;
