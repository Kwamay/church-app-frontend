import React from "react";
import "../css/dashboard.css";
import { IoInformationCircleOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="App">
      <h1>Overview!</h1>
      <p>
        This is where you can view your important information and statistics.
      </p>
     <div className="field-section">
      <div className="field-container">
        <div className="dashboard-field-container">
          <p className="dashboard-field">Church Membership Size</p>
          <IoInformationCircleOutline />
        </div>
        <h3 className="counter">13</h3>
      </div>
      <div className="field-container">
        <div className="dashboard-field-container">
          <p className="dashboard-field">Church Membership Size</p>
          <IoInformationCircleOutline />
        </div>
        <h3 className="counter">13</h3>
      </div>
      <div className="field-container">
        <div className="dashboard-field-container">
          <p className="dashboard-field">Church Membership Size</p>
          <IoInformationCircleOutline />
        </div>
        <h3 className="counter">13</h3>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
