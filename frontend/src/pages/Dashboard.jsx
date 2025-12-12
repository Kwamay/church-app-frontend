import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMember } from "../redaux/actions/memberAction";
import "../css/dashboard.css";
import BirthdayReminder from "../component/BirthdayReminder";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    members,
    status, 
    error: membersError,
  } = useSelector((state) => state.members);

  useEffect(() => {
    console.log("Fetching members..."); 
    dispatch(getAllMember());
  }, [dispatch]);

  const memberCount = members ? members.length : 0;

  return (
    <div className="App">
      <h1 className="intro">Overview!</h1>
      <p className="mb-4">
        This is where you can view your important information and statistics.
      </p>

      <div className="grid grid-col-1 md:grid md:grid-col-2 lg:flex lg:flex-row">
        {/* Membership Size Card */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div>
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Church Membership Size
                  </span>

                  <div className="text-900 font-medium text-xl">
                    {status === "loading" ? (
                      <i
                        className="pi pi-spin pi-spinner"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    ) : membersError ? (
                      <span className="text-red-500">Error</span>
                    ) : (
                      memberCount
                    )}
                  </div>
                </div>

                <div
                  className="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className="pi pi-users text-blue-500 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static cards */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div>
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Revenue
                  </span>
                  <div className="text-900 font-medium text-xl">$2.100</div>
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-orange-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More static cards */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div>
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
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div>
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
            </div>

            <div className="flex justify-content-between align-items-center">
              <span className="text-green-500 font-medium">85</span>
              <button
                className="p-button p-button-sm p-button-raised p-button-info"
                style={{ padding: "0.3rem 0.6rem" }}
              >
                Buy SMS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="second-field-section mb-4">
        <p className="text-lg font-medium mb-3">Quick Actions</p>

        <div className="flex flex-wrap gap-6">
          <Link
            className="second-dashbord-btn p-button p-button-raised p-button-secondary"
            to="/addmembers"
          >
            Add Member
          </Link>

          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">
            Send SMS
          </button>

          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">
            Add First Timer
          </button>

          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">
            Record Offering
          </button>

          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">
            Record Expenses
          </button>
        </div>
      </div>

      <div className="mt-5">
        <BirthdayReminder />
      </div>
    </div>
  );
};

export default Dashboard;
