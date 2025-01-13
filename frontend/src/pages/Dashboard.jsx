import React from "react";
import { Link } from "react-router-dom";
import "../css/dashboard.css";
import FieldContainer from "../component/FieldContainer";
import { IoInformationCircleOutline } from "react-icons/io5";

const Dashboard = () => {
  return (
    <div className="App">
      <h1 className="intro">Overview!</h1>
      <p>
        This is where you can view your important information and statistics.
      </p>
      {/* <div className="field-section">
        <FieldContainer
          icon={IoInformationCircleOutline}
          title={"card one"}
          number={"13"}
        />
        <FieldContainer
          icon={IoInformationCircleOutline}
          title={"card two"}
          number={"45"}
        />
        <FieldContainer
          icon={IoInformationCircleOutline}
          title={"buy sms"}
          number={"54"}
        />
      </div> */}

      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Orders</span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">24 new </span>
            <span className="text-500">since last visit</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Revenue</span>
                <div className="text-900 font-medium text-xl">$2.100</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-map-marker text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">%52+ </span>
            <span className="text-500">since last week</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Customers
                </span>
                <div className="text-900 font-medium text-xl">28441</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-inbox text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">520 </span>
            <span className="text-500">newly registered</span>
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Comments
                </span>
                <div className="text-900 font-medium text-xl">152 Unread</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-comment text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">85 </span>
            <span className="text-500">responded</span>
          </div>
        </div>
      </div>

      <div className="second-field-section">
        <p>Quick Things you can do</p>
        <Link className="second-dashbord-btn" to="/addmembers">
          Add Member
        </Link>
        <button className="second-dashbord-btn">Send SMS</button>
        <button className="second-dashbord-btn">Add First Timer</button>
        <button className="second-dashbord-btn">Record Offering</button>
        <button className="second-dashbord-btn">Record Expenses</button>
      </div>
    </div>
  );
};

export default Dashboard;
