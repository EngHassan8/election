import React, { useState } from "react";
import SideBar from "../../componets/SideBar";
export default function SettingsPage() {
  const [name, setName] = useState("Hassan");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("so"); // Somali default
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    // Halkan ku dar API call ama logic kale oo keydiya xogta
    setMessage("Settings have been saved successfully!");
  };

  const handleCancel = () => {
    // Dib u celi xogta asalka ah (optional)
    setName("Hassan");
    setPassword("");
    setLanguage("so");
    setNotifications(true);
    setMessage("");
  };

  return (
    <div>
<SideBar />
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Magacaaga</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Geli magacaaga"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Password cusub</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Geli password cusub"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Luqadda</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="so">Somali</option>
          <option value="ar">Arabic</option>
        </select>
      </div>

      <div className="mb-6 flex items-center space-x-3">
        <input
          id="notifToggle"
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="notifToggle" className="text-gray-700 font-medium">
          Enable Notifications
        </label>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
    </div>
  );
}
