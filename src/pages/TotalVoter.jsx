// src/pages/TotalVoter.jsx
import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import SideBar from '../componets/SideBar';

const BASE_URL = "https://back-24vm.onrender.com";

const TotalVoter = () => {
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [idSearch, setIdSearch] = useState("");

  const handleGetData = () => {
    axios.get(`${BASE_URL}/get`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/remove/${id}`)
      .then(() => {
        alert("✅ Xogta waa la tirtiray.");
        setData(prev => prev.filter(item => item._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filtered = data.filter((item) =>
    item.Name.toLowerCase().includes(nameSearch.toLowerCase()) &&
    item.ID.toLowerCase().includes(idSearch.toLowerCase())
  );

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <SideBar />

      <div className="flex-1 p-6">
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
                  filtered.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100 text-center">
                      <td className="border p-2">
                        <img
                          src={`${BASE_URL}/sawir/${item.image}`}
                          alt="User"
                          className="rounded-full w-10 h-10 object-cover mx-auto ring-2 ring-blue-400"
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
