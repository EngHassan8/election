import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SideBar from "../../componets/SideBar";

const API_URL = "https://back-24vm.onrender.com"; // ← endpoint-kaaga Render

function Register() {
  const [Name, setName] = useState("");
  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleTotalStudent = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("ID", ID);
    formData.append("Mobile", Mobile);
    formData.append("Password", Password);
    formData.append("Email", Email);
    formData.append("img", image);

    try {
      await axios.post(`${API_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registered successfully");
      setName(""); setID(""); setPassword(""); setMobile(""); setEmail(""); setImage(null);

      setTimeout(() => navigate("/totalVoter"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to register");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/5 bg-white shadow-md">
        <SideBar />
      </div>

      <div className="w-4/5 p-10">
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-xl rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            📥 Register Form
          </h2>
          <form className="space-y-6" onSubmit={handleTotalStudent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold">👤 Name:</label>
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Magacaaga"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">📧 Email:</label>
                <input
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email-kaaga"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">🆔 ID:</label>
                <input
                  type="text"
                  value={ID}
                  onChange={(e) => setID(e.target.value)}
                  placeholder="ID-gaaga"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">📞 Mobile:</label>
                <input
                  type="text"
                  value={Mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Numberkaaga"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">🔐 Password:</label>
                <input
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Furahaaga"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold">🖼️ Upload Image:</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded-xl bg-gray-50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800 transition"
            >
              Register
            </button>
          </form>

          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Register;
