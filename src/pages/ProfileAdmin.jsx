import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../componets/SideBar";

const ProfileAdmin = () => {
  const [registerData, setRegisterData] = useState({ Email: "", Password: "" });
  const [admins, setAdmins] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedAdmin, setEditedAdmin] = useState({ Email: "", Password: "" });

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const res = await axios.get("https://back-1-374m.onrender.com/get/Mamule");
      setAdmins(res.data);
    } catch (error) {
      toast.error("Error fetching admins");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Register new admin
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerData.Email || !registerData.Password) return;
    try {
      const res = await axios.post("https://back-1-374m.onrender.com/admin/Register", registerData);
      toast.success(res.data);
      setRegisterData({ Email: "", Password: "" });
      fetchAdmins();
    } catch (error) {
      toast.error("Failed to register admin");
      console.error(error);
    }
  };

  // Save edited admin
  const handleEditSave = async (adminId) => {
    if (!editedAdmin.Email) return toast.error("Email required");
    try {
      await axios.put(`https://back-1-374m.onrender.com/update/${adminId}`, editedAdmin);
      toast.success("Updated successfully");
      setEditMode(null);
      setEditedAdmin({ Email: "", Password: "" });
      fetchAdmins();
    } catch (error) {
      toast.error("Failed to update admin");
      console.error(error);
    }
  };

  // Delete admin
  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`https://back-1-374m.onrender.com/remove/${adminId}`);
      toast.success("Deleted successfully");
      fetchAdmins();
    } catch (error) {
      toast.error("Failed to delete admin");
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="p-4 max-w-4xl mx-auto w-full">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">Admin Profile Page</h1>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="p-4 border rounded shadow bg-white max-w-md mb-8">
          <h2 className="font-semibold text-lg mb-2">Register Admin</h2>
          <input
            type="email"
            placeholder="Email"
            value={registerData.Email}
            onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.Password}
            onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
            className="block w-full p-2 border mb-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Register
          </button>
        </form>

        {/* Admin List */}
        <div className="mt-4">
          <h2 className="font-bold text-xl mb-2">All Admins</h2>
          <div className="space-y-3">
            {admins.map((admin) => (
              <div key={admin._id} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                {editMode === admin._id ? (
                  <div className="flex-grow">
                    <input
                      type="email"
                      value={editedAdmin.Email}
                      onChange={(e) => setEditedAdmin({ ...editedAdmin, Email: e.target.value })}
                      className="block w-full p-2 border mb-2 rounded"
                      required
                    />
                    <input
                      type="password"
                      value={editedAdmin.Password}
                      onChange={(e) => setEditedAdmin({ ...editedAdmin, Password: e.target.value })}
                      className="block w-full p-2 border mb-2 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                        onClick={() => handleEditSave(admin._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                        onClick={() => setEditMode(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p><strong>Email:</strong> {admin.Email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditMode(admin._id);
                          setEditedAdmin({ Email: admin.Email, Password: "" });
                        }}
                        className="text-sm bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-sm bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
