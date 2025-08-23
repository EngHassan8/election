import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ku qor login logic-gaaga halkan
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-700 hover:bg-blue-800 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
