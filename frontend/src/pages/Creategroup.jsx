import React, { useState } from "react";

const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDay, setMeetingDay] = useState("");
  const [frequency, setFrequency] = useState("");
  const [location, setLocation] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Sample existing members (pretend from database)
  const existingMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Leader",
      email: "john@mail.com",
      phone: "0240000000",
    },
    {
      id: 2,
      name: "Mary Ama",
      position: "Assistant",
      email: "mary@mail.com",
      phone: "0241111111",
    },
    {
      id: 3,
      name: "Samuel Boateng",
      position: "Member",
      email: "sam@mail.com",
      phone: "0242222222",
    },
  ];

  const handleAddMember = (member) => {
    if (!members.find((m) => m.id === member.id)) {
      setMembers([...members, member]);
    }
    setShowModal(false);
  };

  const handleRemove = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // SAVE GROUP FUNCTION
  const saveGroup = () => {
    if (!groupName || !description || !meetingDay || !frequency || !location) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    const newGroupData = {
      groupName,
      description,
      meetingDay,
      frequency,
      location,
      members,
      image: groupImage ? groupImage.name : null,
    };

    console.log("GROUP CREATED SUCCESSFULLY:");
    console.log(newGroupData);

    alert("Group saved successfully! (Check console for data)");

    setGroupName("");
    setDescription("");
    setMeetingDay("");
    setFrequency("");
    setLocation("");
    setMembers([]);
    setGroupImage(null);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Group Details</h1>
          <h3 className="text-gray-500">Groups &gt; Create Group</h3>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 mb-4 font-medium border border-red-300 bg-red-50 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="grid grid-cols-3 gap-6">
          {/* Left fields */}
          <div className="col-span-2 space-y-4">
            <div>
              <label className="font-semibold">Group Name *</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">Description *</label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded-md h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-xl w-40 h-40 flex items-center justify-center">
              {groupImage ? (
                <img
                  src={URL.createObjectURL(groupImage)}
                  alt="group"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-5xl text-gray-400">👤</div>
              )}
            </div>
            <input
              type="file"
              className="mt-3"
              onChange={(e) => setGroupImage(e.target.files[0])}
            />
          </div>
        </div>

        {/* Meeting Info */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div>
            <label className="font-semibold">Select Day *</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={meetingDay}
              onChange={(e) => setMeetingDay(e.target.value)}
            >
              <option value="">Select meeting</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Select Frequency *</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="">Select meeting</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Location *</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              placeholder="Enter meeting location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="mt-10">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button className="bg-blue-900 text-white px-6 py-2 rounded-full">
            Members
          </button>
          <button className="bg-gray-200 px-6 py-2 rounded-full">
            Subgroups
          </button>
        </div>

        {/* Add Member */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-800 text-white px-6 py-2 rounded-full"
          >
            Add New Member
          </button>

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md"
          />
        </div>

        {/* Members Table */}
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No members added yet.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} className="border-b text-center">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.position}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.phone}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-blue-600">SMS</button>
                    <button
                      className="text-red-600"
                      onClick={() => handleRemove(m.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* SAVE GROUP BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={saveGroup}
            className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Save Group
          </button>
        </div>
      </div>

      {/* Member Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 p-5 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Select Member</h2>

            {existingMembers.map((mem) => (
              <div
                key={mem.id}
                className="flex justify-between items-center pb-3 border-b mb-3"
              >
                <div>
                  <h4 className="font-semibold">{mem.name}</h4>
                  <p className="text-sm">{mem.email}</p>
                </div>
                <button
                  onClick={() => handleAddMember(mem)}
                  className="bg-blue-700 px-4 py-1 text-white rounded-md"
                >
                  Add
                </button>
              </div>
            ))}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-1 rounded-md w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
