import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import SideBar from '../componets/SideBar';
import toast, { Toaster } from 'react-hot-toast';

const TotalVoter = () => {
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [idSearch, setIdSearch] = useState("");

  // Fetch all voters
  const handleGetData = async () => {
    try {
      const response = await axios.get("https://back-1-374m.onrender.com/get");
      setData(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // Delete voter
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this voter?")) return;
    try {
      await axios.delete(`https://back-1-374m.onrender.com/remove/${id}`);
      toast.success("✅ Voter deleted successfully");
      setData(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete voter");
    }
  };

  const filtered = data.filter((item) =>
    item.Name.toLowerCase().includes(nameSearch.toLowerCase()) &&
    item.ID.toLowerCase().includes(idSearch.toLowerCase())
  );

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <SideBar />
      <div className="flex-1 p-6">
        <Toaster />
        <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">📋 Diiwaanka Ardayda</h1>
            <NavLink to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
                ➕ Ku dar Arday
              </button>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="🔍 Magaca ardayga"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              placeholder="🆔 Aqoonsiga ardayga (ID)"
              value={idSearch}
              onChange={(e) => setIdSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-md shadow text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-2 py-2">Image</th>
                  <th className="border px-2 py-2">Name</th>
                  <th className="border px-2 py-2">Email</th>
                  <th className="border px-2 py-2">ID</th>
                  <th className="border px-2 py-2">Password</th>
                  <th className="border px-2 py-2">Number</th>
                  <th className="border px-2 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-100 text-center">
                      <td className="border p-2">
                        <img
                          src={`https://back-1-374m.onrender.com/sawir/${item.image}`}
                          alt={item.Name}
                          className="rounded-full w-10 h-10 object-cover mx-auto ring-2 ring-blue-400"
                          onError={(e) => e.target.src = "/default-user.png"}
                        />
                      </td>
                      <td className="border px-2 py-2">{item.Name}</td>
                      <td className="border px-2 py-2">{item.Email}</td>
                      <td className="border px-2 py-2">{item.ID}</td>
                      <td className="border px-2 py-2">{item.Password}</td>
                      <td className="border px-2 py-2">{item.Mobile}</td>
                      <td className="border px-2 py-2">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800 text-xl"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      ❌ Ma jiro arday la helay.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalVoter;
