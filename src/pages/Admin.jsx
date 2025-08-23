import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { User, Lock } from "lucide-react";

function Admin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const navigate = useNavigate();

  // ✅ haddii hore loo login sameeyay -> u gudub dashboard
  useEffect(() => {
    const storedAdmin = localStorage.getItem("login");
    if (storedAdmin) {
      navigate("/dashbord");
    } else {
      setCheckingLogin(false);
    }
  }, [navigate]);

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://back-24vm.onrender.com/admin/login", {
        Email,
        Password,
      });

      setLoading(false);

      if (res.data.success) {
        toast.success("Login Successful 🎉");
        localStorage.setItem("login", JSON.stringify(res.data.data));
        setTimeout(() => {
          navigate("/dashbord");
        }, 200);
      } else {
        toast.error(res.data.message || "Incorrect Email or Password ❌");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Server error 🚨");
      console.error(err);
    }
  };

  if (checkingLogin) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <User className="w-14 h-14 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Admin Login
        </h2>

        {/* Email Input */}
        <div className="relative mb-5">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-8">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg 
            hover:bg-blue-700 transition font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Admin;
