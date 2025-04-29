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
        style={{ width: "60vw", borderRadius: "10px", padding: "20px" }}
        className="shadow-lg rounded-lg"
      >
        {selectedMember && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Profile Image & Name */}
            <div className="flex flex-col items-center border-b pb-4 mb-4">
              <img
                src={
                  selectedMember.profile_picture ||
                  "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full shadow-lg border-4 border-gray-300 object-cover"
                style={{ width: "50rem", height: "28rem", borderRadius: "10%" }}
              />
            </div>

            {/* Member Information */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 mt-3">
                {selectedMember.first_name} {selectedMember.surname}
              </h2>
              <p>
                <strong className="text-gray-500">Email:</strong>{" "}
                {selectedMember.email}
              </p>

              <p>
                <strong className="text-gray-900">📞 Phone:</strong>{" "}
                {selectedMember.phone_number}
              </p>
              <p>
                <strong className="text-gray-900">🆔 Membership:</strong>{" "}
                {selectedMember.membership}
              </p>
              <p>
                <strong className="text-gray-900">💍 Marital Status:</strong>{" "}
                {selectedMember.marital_status}
              </p>
              <p>
                <strong className="text-gray-900">🚻 Gender:</strong>{" "}
                {selectedMember.gender}
              </p>
              <p>
                <strong className="text-gray-900">🎂 Date of Birth:</strong>{" "}
                {selectedMember.date}
              </p>
              <p>
                <strong className="text-gray-900">🏠 Address:</strong>{" "}
                {selectedMember.resident_address}
              </p>
              <p>
                <strong className="text-gray-900">🙏 Sub Ministry:</strong>{" "}
                {selectedMember.sub_ministry}
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">First Name</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Surname</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Email</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Phone Number</label>
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
        
          {/* Membership */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Membership</label>
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
              <option value="War Night Participant">War Night Participant</option>
              <option value="Old Member">Old Member</option>
            </select>
          </div>
        
          {/* Marital Status */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Marital Status</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Gender</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Date of Birth</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Address</label>
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
            <label className="font-semibold text-gray-700 mb-3 w-full md:w-32">Sub Ministry</label>
            <select
              value={editedMember.sub_ministry}
              onChange={(e) =>
                setEditedMember({
                  ...editedMember,
                  sub_ministry: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sub Ministry</option>
              <option value="Intercessory Warriors">Intercessory Warriors</option>
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
