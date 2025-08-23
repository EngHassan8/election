import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaUserAlt, FaIdBadge } from "react-icons/fa";

function AdminVoter() {
  const [Name, setName] = useState("");
  const [ID, setID] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/admin/voter", {
        Name,
        ID,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Login Successfully");

          // ✅ Save voter object in localStorage
          localStorage.setItem("voterUser", JSON.stringify(res.data.data));
          localStorage.setItem("lock", "true");

          setTimeout(() => {
            navigate("/dashVoter");
          }, 1000);
        } else {
          toast.error("Incorrect Name or ID");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server Error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-[#4A90E2] via-[#50C9CE] to-[#96FBC4] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-10 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome Voter Admin
        </h2>

        <div className="relative w-full mb-6">
          <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 h-12 rounded-lg border border-gray-300 focus:border-[#4A90E2] focus:ring-2 focus:ring-[#50C9CE] transition outline-none text-gray-700"
          />
        </div>

        <div className="relative w-full mb-8">
          <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Enter Your ID"
            required
            value={ID}
            onChange={(e) => setID(e.target.value)}
            className="w-full pl-12 h-12 rounded-lg border border-gray-300 focus:border-[#4A90E2] focus:ring-2 focus:ring-[#50C9CE] transition outline-none text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#50C9CE] to-[#4A90E2] text-white p-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-shadow shadow-md"
        >
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AdminVoter;
