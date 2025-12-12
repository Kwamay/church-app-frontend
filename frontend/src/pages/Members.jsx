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

  const Detail = ({ label, value }) => (
    <p className="text-gray-700 flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value || "—"}</span>
    </p>
  );

  const subMinistryBodyTemplate = (rowData) => {
    if (!rowData.sub_ministry || rowData.sub_ministry.length === 0) {
      return <Tag value="None" severity="info" />;
    }

    return rowData.sub_ministry.join(", ");
  };

  const InputField = ({ label, value, onChange, type = "text", span = 1 }) => (
  <div className={`flex flex-col ${span === 2 ? "md:col-span-2" : ""}`}>
    <label className="font-semibold text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-xl shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="p-3 border border-gray-300 rounded-xl shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);


  return (
    <div className="card">
      <DataTable
        value={[...members].reverse()}
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
          body={subMinistryBodyTemplate}
          filter
          filterPlaceholder="Search"
          style={{ minWidth: "180px", width: "14%" }}
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
        className="w-[55vw] rounded-2xl shadow-xl bg-white"
      >
        {selectedMember && (
          <div className="p-6 space-y-8">
            {/* === Profile Section === */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={
                    selectedMember.profile_picture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-80 h-80 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_25px_5px_rgba(79,70,229,0.25)]"></div>
              </div>

              {/* Name */}
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                {selectedMember.first_name} {selectedMember.surname}
              </h2>
              <p className="text-gray-500 text-sm">Member Information</p>
            </div>

            {/* === Details Card === */}
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
              {/* Column 1 */}
              <div className="space-y-4">
                <Detail label="📧 Email" value={selectedMember.email} />
                <Detail label="📞 Phone" value={selectedMember.phone_number} />
                <Detail
                  label="🆔 Membership Year"
                  value={selectedMember.year_joined}
                />
                <Detail label="🎂 Date of Birth" value={selectedMember.date} />
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <Detail
                  label="🆔 Membership Type"
                  value={selectedMember.membership}
                />
                <Detail
                  label="💍 Marital Status"
                  value={selectedMember.marital_status}
                />
                <Detail label="🚻 Gender" value={selectedMember.gender} />
                <Detail
                  label="🏠 Address"
                  value={selectedMember.resident_address}
                />
              </div>

              {/* Sub Ministries - Full Row */}
              <div className="col-span-2 bg-white rounded-xl p-4 border shadow-sm mt-4">
                <p className="font-semibold text-gray-700 mb-2">
                  🙏 Sub Ministry:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(selectedMember.sub_ministry) &&
                  selectedMember.sub_ministry.length > 0 ? (
                    selectedMember.sub_ministry.map((ministry, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
                      >
                        {ministry}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>

     {/* Edit Dialog */}
<Dialog
  visible={editDialog}
  onHide={() => setEditDialog(false)}
  header="Edit Member"
  className="w-[60vw] rounded-2xl shadow-xl bg-white"
>

  {editedMember && (
    <div className="p-8 space-y-10">

      {/* === PROFILE SECTION === */}
      <div className="flex flex-col items-center">

        {/* Profile Image */}
        <div className="relative">
          <img
            src={
              editedMember.previewImage ||
              editedMember.profile_picture ||
              "https://via.placeholder.com/200"
            }
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-blue-200 shadow-lg"
          />

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_30px_8px_rgba(79,70,229,0.25)]"></div>
        </div>

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          className="mt-4 p-2 text-sm border border-gray-300 rounded-md cursor-pointer"
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

        {/* Name Display */}
        <h2 className="text-3xl font-bold mt-4 text-gray-900">
          {editedMember.first_name} {editedMember.surname}
        </h2>
        <p className="text-gray-500 text-sm">Edit Member Information</p>
      </div>

      {/* === FORM CARD === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 shadow-inner rounded-2xl p-8 border border-gray-200">

        {/* FIRST NAME */}
        <InputField
          label="First Name"
          value={editedMember.first_name}
          onChange={(e) =>
            setEditedMember({ ...editedMember, first_name: e.target.value })
          }
        />

        {/* SURNAME */}
        <InputField
          label="Surname"
          value={editedMember.surname}
          onChange={(e) =>
            setEditedMember({ ...editedMember, surname: e.target.value })
          }
        />

        {/* EMAIL */}
        <InputField
          label="Email"
          type="email"
          value={editedMember.email}
          onChange={(e) =>
            setEditedMember({ ...editedMember, email: e.target.value })
          }
        />

        {/* PHONE NUMBER */}
        <InputField
          label="Phone Number"
          value={editedMember.phone_number}
          onChange={(e) =>
            setEditedMember({
              ...editedMember,
              phone_number: e.target.value,
            })
          }
        />

        {/* YEAR JOINED */}
        <SelectField
          label="Year of Membership"
          value={editedMember.year_joined}
          options={Array.from(
            { length: new Date().getFullYear() - 2000 + 1 },
            (_, i) => 2000 + i
          )}
          onChange={(e) =>
            setEditedMember({ ...editedMember, year_joined: e.target.value })
          }
        />

        {/* MEMBERSHIP TYPE */}
        <SelectField
          label="Membership"
          value={editedMember.membership}
          options={[
            "New Convert",
            "Visitor",
            "War Night Participant",
            "Old Member",
          ]}
          onChange={(e) =>
            setEditedMember({ ...editedMember, membership: e.target.value })
          }
        />

        {/* MARITAL STATUS */}
        <SelectField
          label="Marital Status"
          value={editedMember.marital_status}
          options={[
            "Single",
            "Engaged",
            "Married",
            "Single Parent",
            "Divorced",
          ]}
          onChange={(e) =>
            setEditedMember({ ...editedMember, marital_status: e.target.value })
          }
        />

        {/* GENDER */}
        <SelectField
          label="Gender"
          value={editedMember.gender}
          options={["Male", "Female"]}
          onChange={(e) =>
            setEditedMember({ ...editedMember, gender: e.target.value })
          }
        />

        {/* DATE OF BIRTH */}
        <InputField
          label="Date of Birth"
          type="date"
          value={editedMember.date}
          onChange={(e) =>
            setEditedMember({ ...editedMember, date: e.target.value })
          }
        />

        {/* ADDRESS FULL WIDTH */}
        <InputField
          label="Address"
          value={editedMember.resident_address}
          onChange={(e) =>
            setEditedMember({
              ...editedMember,
              resident_address: e.target.value,
            })
          }
          span={2}
        />

        {/* SUB MINISTRY */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-700 mb-2 block">
            Sub Ministry
          </label>

          <Select
            options={subMinistryOptions}
            value={subMinistryOptions.filter((option) =>
              editedMember.sub_ministry?.includes(option.value)
            )}
            onChange={(selectedOptions) =>
              setEditedMember({
                ...editedMember,
                sub_ministry: selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [],
              })
            }
            isMulti
            isClearable
            placeholder="Select Sub Ministries"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="md:col-span-2 flex justify-end mt-6">
          <Button
            label="Save Changes"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
            onClick={saveChanges}
          />
        </div>
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
