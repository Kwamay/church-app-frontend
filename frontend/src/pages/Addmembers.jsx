import React, { useState } from "react";
import "../css/app.css";

const AddMembers = () => {
  const [formData, setFormData] = useState({
    membership: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    maritalStatus: "",
    gender: "",
    date: "",
    address: "",
    group: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="App">
      <div className="page-header-container">
        <div>
          <h1 className="addmember-heading">Add Member</h1>
          <h3 className="addmember-subheading">Members &gt; Add Member</h3>
          <h3 className="biodata">Biodata</h3>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-member-form">
          <div className="form-group">
            <label className="label">First Name</label>
            <input
              className="label-input"
              type="text"
              name="first-name"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Surname</label>
            <input
              className="label-input"
              type="text"
              name="last-name"
              placeholder="Last name"
              value={formData.lastName}
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
              type="text"
              name="phone"
              placeholder="Enter a phone number"
              value={formData.phone}
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
              <option value="new-convert">New Convert</option>
              <option value="visitor">Visitor</option>
              <option value="war-night-participant">
                War Night Participant
              </option>
              <option value="old-member">Old Member</option>
            </select>
          </div>

          <div className="form-group-2">
            <select
              className="label-input-2"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Marital Status</option>
              <option value="single">Single</option>
              <option value="engaged">Engaged</option>
              <option value="married">Married</option>
              <option value="single-parent">Single Parent</option>
              <option value="divorced">Divorced</option>
            </select>

            <select
              className="label-input-2"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Date</label>
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
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Sub Ministry of Member</label>
            <select
              className="label-input"
              name="group"
              value={formData.group}
              onChange={handleChange}
              required
            >
              <option value="">Sub Ministry</option>
              <option value="intercessory-warriors">
                Intercessory Warriors
              </option>
              <option value="evangelism">Evangelism and Outreach Team</option>
              <option value="multi-media">Multi Media Department</option>
              <option value="victorious-voices">Victorious Voices</option>
              <option value="protocol">Protocol Team</option>
              <option value="executives">Executives</option>
              <option value="leaders">Leaders</option>
              <option value="congregation">Congregation</option>
              <option value="royals-of-heaven">Royals Of Heaven</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Save Information
          </button>
        </form>

        <div className="form-group-pic">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Profile Preview" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
