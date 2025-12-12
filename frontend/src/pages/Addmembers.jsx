import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import "../css/app.css";
import { createMember } from "../redaux/actions/memberAction";

const initialFormData = {
  first_name: "",
  surname: "",
  email: "",
  phone_number: "",
  year_joined: new Date().getFullYear(),
  membership: "",
  marital_status: "",
  gender: "",
  date: "",
  resident_address: "",
  sub_ministry: [],
  profilePicture: null,
};

const AddMembers = ({ member, onSubmit }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(member || { ...initialFormData });
  const [previewImage, setPreviewImage] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const notificationTimeoutRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const showNotification = (message, type = "success", duration = 3000) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification({ message: "", type: "" });
      notificationTimeoutRef.current = null;
    }, duration);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, profilePicture: null }));
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onSubmit) {
        await onSubmit(formData);
        showNotification("Member information submitted successfully!", "success");
      } else {
        await dispatch(createMember(formData));
        showNotification("Member added successfully!", "success");
        setFormData({ ...initialFormData });
        setPreviewImage(null);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save information. Please try again.";
      showNotification(errorMessage, "error", 5000);
    }
  };

  // --- React Select Options ---
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, i) => {
      const year = 2000 + i;
      return { value: year, label: year };
    }
  );

  const membershipOptions = [
    { value: "New Convert", label: "New Convert" },
    { value: "Visitor", label: "Visitor" },
    { value: "War Night Participant", label: "War Night Participant" },
    { value: "Old Member", label: "Old Member" },
  ];

  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Engaged", label: "Engaged" },
    { value: "Married", label: "Married" },
    { value: "Single Parent", label: "Single Parent" },
    { value: "Divorced", label: "Divorced" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const subMinistryOptions = [
    { value: "Intercessory Warriors", label: "Intercessory Warriors" },
    { value: "Evangelism", label: "Evangelism and Outreach Team" },
    { value: "Multi Media", label: "Multi Media Department" },
    { value: "Victorious Voices", label: "Victorious Voices" },
    { value: "Protocol", label: "Protocol Team" },
    { value: "Executives", label: "Executives" },
    { value: "Leaders", label: "Leaders" },
    { value: "Congregation", label: "Congregation" },
    { value: "Royals Of Heaven", label: "Royals Of Heaven" },
  ];

  const notificationStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "5px",
    color: "white",
    zIndex: 1000,
    minWidth: "250px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: notification.type === "success" ? "#4CAF50" : "#f44336",
  };

  return (
    <div className="App">
      {notification.message && (
        <div style={notificationStyle}>{notification.message}</div>
      )}

      <div className="page-header-container">
        <div>
          <h1 className="addmember-heading">Add Member</h1>
          <h3 className="addmember-subheading">Members &gt; Add Member</h3>
        </div>
        <h3 className="biodata mr-[17rem]">Biodata</h3>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-member-form">
          {/* Text Inputs */}
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
              type="tel"
              name="phone_number"
              placeholder="Enter a phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* React Select Fields */}
          <div className="form-group">
            <label className="label">Year of Membership</label>
            <Select
              options={yearOptions}
              value={yearOptions.find((opt) => opt.value === formData.year_joined)}
              onChange={(selected) =>
                setFormData({ ...formData, year_joined: selected.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Membership</label>
            <Select
              options={membershipOptions}
              value={membershipOptions.find((opt) => opt.value === formData.membership)}
              onChange={(selected) =>
                setFormData({ ...formData, membership: selected.value })
              }
              required
            />
          </div>

          <div className="form-group-2">
            <Select
              options={maritalStatusOptions}
              value={maritalStatusOptions.find((opt) => opt.value === formData.marital_status)}
              onChange={(selected) =>
                setFormData({ ...formData, marital_status: selected.value })
              }
              placeholder="Marital Status"
              required
            />

            <Select
              options={genderOptions}
              value={genderOptions.find((opt) => opt.value === formData.gender)}
              onChange={(selected) =>
                setFormData({ ...formData, gender: selected.value })
              }
              placeholder="Gender"
              required
            />
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
            <Select
              options={subMinistryOptions}
              value={subMinistryOptions.filter((opt) =>
                formData.sub_ministry.includes(opt.value)
              )}
              onChange={(selected) =>
                setFormData({
                  ...formData,
                  sub_ministry: selected.map((opt) => opt.value),
                })
              }
              isMulti
              placeholder="Select Sub Ministries"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {member ? "Update Information" : "Save Information"}
          </button>
        </form>

        <div className="form-group-pic">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            key={previewImage || "file-input"}
          />
          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Profile Preview"
                style={{ width: "240px", height: "240px" }}
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
