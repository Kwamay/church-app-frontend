import React, { useState } from "react";
import { Link } from "react-router-dom";

const GroupsList = () => {
  const [search, setSearch] = useState("");

  // Pretend these are groups from your database
  const [groups, setGroups] = useState([
    { id: 1, name: "Victorious Voices", members: 3 },
    { id: 2, name: "Ushering Department", members: 0 },
    { id: 3, name: "Royals Of Haven", members: 1 },
    { id: 4, name: "Multi Media Department", members: 1 },
    { id: 5, name: "Ministers", members: 3 },
    { id: 6, name: "Leader", members: 2 },
    { id: 7, name: "Intercessory Warriors", members: 1 },
    { id: 8, name: "Evangelism and Outreach Team", members: 4 },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const deleteGroup = (id) => {
    const filtered = groups.filter((g) => g.id !== id);
    setGroups(filtered);
    alert("Group deleted!");
  };

  // Filter groups based on search text
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Groups</h1>
        </div>

        <Link to="/creategroup" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">
          Create New Group
        </Link>
      </div>

      <hr className="mb-8" />

      {/* Search Bar */}
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-l-md w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="border px-4 py-2 rounded-r-md bg-gray-100">
          🔍
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left p-3">Group</th>
            <th className="text-left p-3">Membership Size</th>
            <th className="text-left p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredGroups.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-5 text-gray-500">
                No groups found.
              </td>
            </tr>
          ) : (
            filteredGroups.map((group) => (
              <tr
                key={group.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{group.name}</td>
                <td className="p-3">{group.members}</td>
                <td className="p-3">
                  <div className="flex gap-4">
                    {/* ACTION BUTTON DROPDOWN */}
                    <button
                      onClick={() =>
                        setSelectedGroup(
                          selectedGroup === group.id ? null : group.id
                        )
                      }
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                      ⋯
                    </button>

                    {/* Dropdown Menu */}
                    {selectedGroup === group.id && (
                      <div className="absolute bg-white border rounded-md shadow-md p-2 mt-8 z-10">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600">
                          Send SMS
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600">
                          Send Email
                        </button>
                        <button
                          onClick={() => deleteGroup(group.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Delete Group
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsList;
