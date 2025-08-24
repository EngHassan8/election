import React, { useEffect, useState } from "react";
import axios from "axios";
import SideVoter from "../../componets/SideVoter";

function Profile() {
  const [voter, setVoter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("voterUser"));

    if (data?.Name && data?.ID) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("https://back-1-374m.onrender.com/profile", {
            params: { Name: data.Name, ID: data.ID },
          });
          setVoter(res.data);
          setError("");
        } catch (err) {
          console.error(err);
          setError("Error loading profile.");
        }
      };
      fetchProfile();
    } else {
      setError("User not logged in or missing credentials");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-100">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  if (!voter) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="md:w-[260px] w-full">
        <SideVoter />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 bg-[#e9f2fb] py-10">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-md">
            {voter.image ? (
              <img
                src={`https://back-1-374m.onrender.com/sawir/${voter.image}`}
                alt={voter.Name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-blue-800 font-bold text-3xl flex items-center justify-center">
                {voter.Name?.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="sm:text-left space-y-2">
              <p className="text-2xl font-bold">{voter.Name}</p>
              <p className="text-white/80 font-medium">ID: {voter.ID}</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#f1f5f9] rounded-lg p-4 border border-blue-200 shadow-sm">
              <p className="text-sm text-blue-600 font-semibold mb-1">Email</p>
              <p className="text-gray-800">{voter.Email || "Not Provided"}</p>
            </div>

            <div className="bg-[#f1f5f9] rounded-lg p-4 border border-blue-200 shadow-sm">
              <p className="text-sm text-blue-600 font-semibold mb-1">Mobile</p>
              <p className="text-gray-800">{voter.Mobile || "N/A"}</p>
            </div>

            <div className="bg-[#f1f5f9] rounded-lg p-4 border border-blue-200 shadow-sm col-span-1 sm:col-span-2">
              <p className="text-sm text-blue-600 font-semibold mb-1">Status</p>
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
