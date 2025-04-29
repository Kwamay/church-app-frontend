import React, { useState, useEffect, useRef } from "react"; // Import useEffect and useRef
import { useDispatch } from "react-redux";
import "../css/app.css";
import { createMember } from "../redaux/actions/memberAction";

// Define initial state outside the component for easy reset
const initialFormData = {
  first_name: "",
  surname: "",
  email: "",
  phone_number: "",
  membership: "",
  marital_status: "",
  gender: "",
  date: "",
  resident_address: "",
  sub_ministry: "",
  profilePicture: null,
};

const AddMembers = ({ member, onSubmit }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(member || { ...initialFormData });
  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState({ // State for notification
    message: "",
    type: "", // 'success' or 'error'
  });
  const notificationTimeoutRef = useRef(null); // Ref to manage timeout

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Function to show notification and auto-hide it
  const showNotification = (message, type = "success", duration = 3000) => {
    // Clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type });
    // Set new timeout
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification({ message: "", type: "" });
      notificationTimeoutRef.current = null;
    }, duration);
  };

  // ✅ Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle image upload & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      // Clear preview if no file is selected
      setFormData((prev) => ({ ...prev, profilePicture: null }));
      setPreviewImage(null);
    }
  };

  // ✅ Submit form with Redux dispatch - now async
  const handleSubmit = async (e) => { // Make async
    e.preventDefault();
    try {
      if (onSubmit) {
        await onSubmit(formData); // Assume onSubmit might be async
        showNotification("Member information submitted successfully!", "success");
        // Optionally clear form if onSubmit indicates success, might need feedback from prop
        // setFormData({ ...initialFormData });
        // setPreviewImage(null);
        // Consider adding logic based on onSubmit's return value if needed
      } else {
        // Assuming createMember returns a promise that resolves on success
        await dispatch(createMember(formData));
        showNotification("Member added successfully!", "success");

        // Clear the form only on successful dispatch
        setFormData({ ...initialFormData });
        setPreviewImage(null);
         // Reset the file input visually (optional but good UX)
        const fileInput = e.target.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = ""; // Attempt to reset file input
        }
      }
    } catch (error) {
      console.error("Failed to submit member data:", error);
      // Show error notification - adjust message as needed
      const errorMessage = error.response?.data?.message || error.message || "Failed to save information. Please try again.";
      showNotification(errorMessage, "error", 5000); // Show error longer
      // Do not clear the form on error
    }
  };

  // Simple Notification Component Style (adjust in your CSS)
  const notificationStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '5px',
    color: 'white',
    zIndex: 1000,
    minWidth: '250px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: notification.type === 'success' ? '#4CAF50' : '#f44336', // Green for success, Red for error
  };

  return (
    <div className="App">
      {/* Notification Area */}
      {notification.message && (
        <div style={notificationStyle}>
          {notification.message}
        </div>
      )}

      <div className="page-header-container">
        <div>
          <h1 className="addmember-heading">Add Member</h1>
          <h3 className="addmember-subheading">Members &gt; Add Member</h3>
        </div>
        <h3 className="biodata">Biodata</h3>
      </div>

      <div className="form-container">
        {/* Pass the event `e` to handleSubmit */}
        <form onSubmit={handleSubmit} className="add-member-form">
          {/* --- Form Groups (Inputs and Selects remain the same) --- */}
           <div className="form-group">
            <label className="label">First Name</label>
            <input
              className="label-input"
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Surname</label>
            <input
              className="label-input"
              type="text"
              name="surname"
              placeholder="Last name"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Email</label>
            <input
              className="label-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Phone Number</label>
            <input
              className="label-input"
              type="text" // Use "tel" for better mobile UX if desired
              name="phone_number"
              placeholder="Enter a phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Membership</label>
            <select
              className="label-input"
              name="membership"
              value={formData.membership}
              onChange={handleChange}
              required
            >
              <option value="">Select Membership</option>
              <option value="New Convert">New Convert</option>
              <option value="Visitor">Visitor</option>
              <option value="War Night Participant">
                War Night Participant
              </option>
              <option value="Old Member">Old Member</option>
            </select>
          </div>

          <div className="form-group-2">
            <select
              className="label-input-2"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              required
            >
              <option value="">Marital Status</option>
              <option value="Single">Single</option>
              <option value="Engaged">Engaged</option>
              <option value="Married">Married</option>
              <option value="Single Parent">Single Parent</option>
              <option value="Divorced">Divorced</option>
            </select>

            <select
              className="label-input-2"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Date Of Birth</label>
            <input
              className="label-input"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Resident Address</label>
            <input
              className="label-input"
              type="text"
              name="resident_address"
              placeholder="Address"
              value={formData.resident_address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Sub Ministry of Member</label>
            <select
              className="label-input"
              name="sub_ministry"
              value={formData.sub_ministry}
              onChange={handleChange}
              required
            >
              <option value="">Sub Ministry</option>
              <option value="Intercessory Warriors">
                Intercessory Warriors
              </option>
              <option value="Evangelism">Evangelism and Outreach Team</option>
              <option value="Multi Media">Multi Media Department</option>
              <option value="Victorious Voices">Victorious Voices</option>
              <option value="Protocol">Protocol Team</option>
              <option value="Executives">Executives</option>
              <option value="Leaders">Leaders</option>
              <option value="Congregation">Congregation</option>
              <option value="Royals Of Heaven">Royals Of Heaven</option>
            </select>
          </div>
          {/* --- End of Form Groups --- */}

          <button type="submit" className="submit-button">
            {member ? "Update Information" : "Save Information"}
          </button>
        </form>
        <div className="form-group-pic">
          <label>Profile Picture</label>
          {/* Note: The file input is part of the form for submission */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            // Key added to help reset if needed, though clearing state is primary
            key={previewImage || 'file-input'}
          />
          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-lg" // Tailwind classes were here - kept for context
                style={{ width: "240px", height: "240px" }} // Inline styles override Tailwind if present
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMembers;