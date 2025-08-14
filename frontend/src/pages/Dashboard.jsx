import React, { useEffect } from 'react'; // Import useEffect
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; // Import hooks
import { getAllMember } from '../redaux/actions/memberAction'; // Adjust the path as needed
import "../css/dashboard.css";
import BirthdayReminder from "../component/BirthdayReminder"; // Assuming this path is correct

const Dashboard = () => {
  const dispatch = useDispatch();
  // Access the members state from Redux
  const { members, loading: membersLoading, error: membersError } = useSelector((state) => state.members); // Renamed loading/error to avoid conflicts if other state slices are added

  // Fetch members when the component mounts if they aren't already loaded
  useEffect(() => {
    // Only dispatch if members aren't loaded yet to avoid redundant calls
    // Check if members is null/undefined OR if it's an empty array AND not currently loading
    if ((!members || members.length === 0) && !membersLoading) {
       dispatch(getAllMember());
    }
    // The dependency array ensures this runs when dispatch changes (stable)
    // or when members changes (e.g., from null to array) or loading status changes.
  }, [dispatch, members, membersLoading]);

  // Calculate the count safely (defaults to 0 if members is null/undefined)
  const memberCount = members ? members.length : 0;

  return (
    <div className="App"> {/* Consider adding padding or margin if needed e.g., className="App p-4" */}
      <h1 className="intro">Overview!</h1>
      <p className="mb-4"> {/* Added margin-bottom for spacing */}
        This is where you can view your important information and statistics.
      </p>

      <div className="flex mb-4"> {/* Added margin-bottom */}
        {/* Membership Size Card */}
        <div className="col-12 md:col-6 lg:col-3">
          {/* Added h-full for consistent height if needed, adjust based on layout */}
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div> {/* Content wrapper */}
              <div className="flex justify-content-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">Church Membership Size</span>
                  {/* --- Dynamic Count Display --- */}
                  <div className="text-900 font-medium text-xl">
                    {membersLoading ? (
                      <i className="pi pi-spin pi-spinner" style={{ fontSize: '1.5rem' }}></i>
                    ) : membersError ? (
                      <span className="text-red-500" title={membersError.message || 'Failed to load'}>Error</span> // Show tooltip on error
                    ) : (
                      memberCount // Display the actual count
                    )}
                  </div>
                  {/* --- End Dynamic Count Display --- */}
                </div>
                <div
                  className="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  {/* Changed icon to pi-users */}
                  <i className="pi pi-users text-blue-500 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Card (Static) */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
             <div>
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
             </div>
          </div>
        </div>

        {/* Customers Card (Static) */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div>
                <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">
                    Customers {/* Consider renaming if not applicable */}
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

        {/* Comments Card (Static) */}
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round h-full flex flex-column justify-content-between">
            <div>
                <div className="flex justify-content-between mb-3">
                <div>
                    <span className="block text-500 font-medium mb-3">
                    Comments {/* Consider renaming */}
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
             {/* Consider using PrimeReact Button component for consistency */}
            <div className='flex justify-content-between align-items-center'>
                 <span className="text-green-500 font-medium">85 </span>
                <button
                    className="p-button p-button-sm p-button-raised p-button-info" // Using PrimeReact button classes
                    style={{ padding: '0.3rem 0.6rem'}} // Adjusted padding slightly
                    // Add onClick handler if this button should do something
                    // onClick={() => console.log('Buy SMS Clicked')}
                >
                    Buy SMS
                </button>
            </div>
          </div>
        </div>
      </div> {/* End Grid */}

      {/* Quick Actions Section */}
      <div className="second-field-section mb-4"> {/* Added margin-bottom */}
        <p className="text-lg font-medium mb-3">Quick Actions</p> {/* Improved styling */}
        <div className="flex flex-wrap gap-6"> {/* Use flexbox for better button layout */}
          <Link className="second-dashbord-btn p-button p-button-raised p-button-secondary" to="/addmembers"> {/* Added PrimeReact classes */}
            Add Member
          </Link>
          {/* Apply consistent styling to other buttons */}
          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">Send SMS</button>
          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">Add First Timer</button>
          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">Record Offering</button>
          <button className="second-dashbord-btn p-button p-button-raised p-button-secondary">Record Expenses</button>
        </div>
      </div>

      <div className="mt-5">
          <BirthdayReminder />
      </div>

    </div>
  );
};

export default Dashboard;