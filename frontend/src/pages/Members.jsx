import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import {
  getAllMember,
  updateMember,
  deleteMember,
} from "../redaux/actions/memberAction";
import Select from "react-select";
import "primeicons/primeicons.css";

export default function MembersTable() {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(getAllMember());
  }, [dispatch]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editedMember, setEditedMember] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const viewMember = (member) => {
    setSelectedMember(member);
    setViewDialog(true);
  };

  const hideDialog = () => {
    setViewDialog(false);
    setEditDialog(false);
    setDeleteDialog(false);
    setSelectedMember(null);
    setEditedMember(null);
  };

  const editMember = (member) => {
    setEditedMember({ ...member });
    setEditDialog(true);
  };

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

  const saveChanges = () => {
    if (editedMember) {
      dispatch(updateMember(editedMember));
    }
    setEditDialog(false);
  };

  const confirmDeleteMember = (member) => {
    setSelectedMember(member);
    setDeleteDialog(true);
  };

  const handleDelete = () => {
    if (selectedMember) {
      dispatch(deleteMember(selectedMember.id));
    }
    setDeleteDialog(false);
  };

  const profilePictureTemplate = (rowData) => (
    <img
      src={rowData.profile_picture || "https://via.placeholder.com/50"}
      alt="Profile"
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
  );

  const statusBodyTemplate = (rowData) => {
    let severity = "";

    switch (rowData.membership) {
      case "Old Member":
        severity = "success"; // Green
        break;
      case "New Convert":
        severity = "danger"; // Red
        break;
      case "Visitor":
        severity = "warning"; // Yellow/Orange
        break;
      case "War Night Participant":
        severity = "info"; // Blue
        break;
      default:
        severity = "secondary"; // Default gray
    }

    return <Tag value={rowData.membership} severity={severity} />;
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-sm text-blue-500 hover:bg-blue-100"
        onClick={() => viewMember(rowData)}
        tooltip="View Details"
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-sm text-yellow-500 hover:bg-yellow-100"
        onClick={() => editMember(rowData)}
        tooltip="Edit Member"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-sm text-red-500 hover:bg-red-100"
        onClick={() => confirmDeleteMember(rowData)}
        tooltip="Delete Member"
      />
    </div>
  );

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { ...prevFilters.global, value },
    }));
  };

  return (
    <div className="card">
      <DataTable
        value={members}
        paginator
        rows={10}
        header={
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              value={filters.global?.value || ""}
              onChange={onGlobalFilterChange}
              placeholder="Global Search"
            />
          </IconField>
        }
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        dataKey="id"
        emptyMessage="No members found."
        scrollable
        scrollHeight="550px"
      >
        <Column
          field="profile_picture"
          header="Profile"
          body={profilePictureTemplate}
          style={{ width: "10%" }}
        />
        <Column
          field="first_name"
          header="First Name"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ width: "12%" }}
        />
        <Column
          field="surname"
          header="Surname"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ width: "12%" }}
        />
        <Column
          field="email"
          header="Email"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        />
        <Column
          field="membership"
          header="Membership"
          body={statusBodyTemplate}
          sortable
          filter
          filterPlaceholder="Search"
          style={{ width: "12%" }}
        />
        <Column
          field="sub_ministry"
          header="Sub-Ministry"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ minWidth: "180px", width: "12%" }}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ width: "15%" }}
        />
      </DataTable>

      {/* View Dialog */}
      <Dialog
        visible={viewDialog}
        onHide={hideDialog}
        header="Member Details"
        className="w-[60vw] rounded-xl shadow-2xl p-6"
      >
        {selectedMember && (
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Profile Image & Name */}
            <div className="flex flex-col items-center border-b pb-6 mb-6">
              <img
                src={
                  selectedMember.profile_picture ||
                  "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-[50rem] h-[40rem] rounded-[5rem] object-cover border-4 border-gray-300 shadow-lg"
              />
            </div>

            {/* Member Information */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              <h2 className="col-span-2 text-2xl font-bold text-gray-900 mb-4 text-center">
                {selectedMember.first_name} {selectedMember.surname}
              </h2>

              <p>
                <strong className="text-gray-600">📧 Email:</strong>{" "}
                {selectedMember.email}
              </p>
              <p>
                <strong className="text-gray-600">📞 Phone:</strong>{" "}
                {selectedMember.phone_number}
              </p>
              <p>
                <strong className="text-gray-600">
                  🆔 Year of Membership:
                </strong>{" "}
                {selectedMember.year_joined}
              </p>
              <p>
                <strong className="text-gray-600">🆔 Membership:</strong>{" "}
                {selectedMember.membership}
              </p>
              <p>
                <strong className="text-gray-600">💍 Marital Status:</strong>{" "}
                {selectedMember.marital_status}
              </p>
              <p>
                <strong className="text-gray-600">🚻 Gender:</strong>{" "}
                {selectedMember.gender}
              </p>
              <p>
                <strong className="text-gray-600">🎂 Date of Birth:</strong>{" "}
                {selectedMember.date}
              </p>
              <p className="col-span-2">
                <strong className="text-gray-600">🏠 Address:</strong>{" "}
                {selectedMember.resident_address}
              </p>
              <p className="col-span-2 flex items-center gap-2">
                <strong className="text-gray-600">🙏 Sub Ministry:</strong>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(selectedMember.sub_ministry) &&
                  selectedMember.sub_ministry.length > 0 ? (
                    selectedMember.sub_ministry.map((ministry, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {ministry}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </div>
              </p>
            </div>
          </div>
        )}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        visible={editDialog}
        onHide={() => setEditDialog(false)}
        header="Edit Member"
        style={{ width: "60vw", borderRadius: "10px", padding: "20px" }}
        className="shadow-lg rounded-lg"
      >
        {editedMember && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center border-b pb-6 mb-6 md:col-span-2">
              <img
                src={
                  editedMember.previewImage ||
                  editedMember.profile_picture ||
                  "https://via.placeholder.com/120"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-md border-4 border-gray-300 object-cover mb-4"
                style={{ width: "20rem", height: "20rem" }}
              />
              <input
                type="file"
                accept="image/*"
                className="mt-2 p-2 text-sm border border-gray-300 rounded-md"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageURL = URL.createObjectURL(file);
                    setEditedMember((prev) => ({
                      ...prev,
                      profile_picture: file,
                      previewImage: imageURL,
                    }));
                  }
                }}
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                First Name
              </label>
              <input
                type="text"
                value={editedMember.first_name}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    first_name: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Surname */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Surname
              </label>
              <input
                type="text"
                value={editedMember.surname}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    surname: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Email
              </label>
              <input
                type="email"
                value={editedMember.email}
                onChange={(e) =>
                  setEditedMember({ ...editedMember, email: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Phone Number
              </label>
              <input
                type="text"
                value={editedMember.phone_number}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    phone_number: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Year of Membership */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Year of Membership
              </label>
              <select
                value={editedMember.year_joined}
                name="year_joined"
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    year_joined: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select Year</option>
                {Array.from(
                  { length: new Date().getFullYear() - 2000 + 1 },
                  (_, i) => 2000 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Membership */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Membership
              </label>
              <select
                value={editedMember.membership}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    membership: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Marital Status */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Marital Status
              </label>
              <select
                value={editedMember.marital_status}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    marital_status: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Engaged">Engaged</option>
                <option value="Married">Married</option>
                <option value="Single Parent">Single Parent</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Gender
              </label>
              <select
                value={editedMember.gender}
                onChange={(e) =>
                  setEditedMember({ ...editedMember, gender: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Date of Birth
              </label>
              <input
                type="date"
                value={editedMember.date}
                onChange={(e) =>
                  setEditedMember({ ...editedMember, date: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Address
              </label>
              <input
                type="text"
                value={editedMember.resident_address}
                onChange={(e) =>
                  setEditedMember({
                    ...editedMember,
                    resident_address: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Sub Ministry */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">
                Sub Ministry
              </label>
              <Select
                options={subMinistryOptions}
                value={subMinistryOptions.find(
                  (option) => option.value === editedMember.sub_ministry
                )}
                onChange={(selectedOption) =>
                  setEditedMember({
                    ...editedMember,
                    sub_ministry: selectedOption ? selectedOption.value : [],
                  })
                }
                placeholder="Select Sub Ministry"
                isClearable
                isMulti
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 col-span-2 flex justify-end">
              <Button
                label="Save Changes"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
                onClick={saveChanges}
              />
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        visible={deleteDialog}
        onHide={hideDialog}
        header="Confirm Deletion"
        style={{ width: "25vw" }}
      >
        <p>Are you sure you want to delete this member?</p>
        <div className="mt-4 flex justify-end">
          <Button
            label="Cancel"
            className="p-button-secondary mr-2"
            onClick={hideDialog}
          />
          <Button
            label="Delete"
            className="p-button-danger"
            onClick={handleDelete}
          />
        </div>
      </Dialog>
    </div>
  );
}
