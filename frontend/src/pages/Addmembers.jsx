import React, { useState } from "react";

import "../css/app.css";

const Addmembers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
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
    // Code to handle form submission here, e.g., API call
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
            <label className="label">Membership</label>
            <select
              className="label-input"
              name="membership"
              value={formData.membership}
              onChange={handleChange}
              required
            >
              <option value="">Select Membership</option>
              <option value="Leader">Leader</option>
              <option value="New Member">New Member</option>
              <option value="Executive">Executive</option>
              <option value="Old Member">Old Member</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              className="label-input"
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-2">
          <select
              className="label-input-2"
              name="membership"
              value={formData.membership}
              onChange={handleChange}
              required
            >
              <option value="">Marital Status</option>
              <option value="Leader">Single</option>
              <option value="New Member">Engaged</option>
              <option value="Executive">Marriaged</option>
              <option value="Old Member">Single Parent</option>
              <option value="Old Member">Divorced</option>
            </select>
           <select
              className="label-input-2"
              name="membership"
              value={formData.membership}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="Executive">Male</option>
              <option value="Old Member">Female</option>
            </select>
            </div>
          <div className="form-group">
            <label className="label">Role</label>
            <input
              className="label-input"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Member
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

export default Addmembers;
