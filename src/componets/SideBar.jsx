import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Vote,
  LogIn,
  Menu,
  X,
} from "lucide-react";

const menus = [
  { name: "Dashboard", icon: Home, path: "/dashbord" },
  { name: "Candidates", icon: Users, path: "/candidates" },
  { name: "Elections", icon: Vote, path: "/elections" },
  { name: "Voter", icon: BarChart2, path: "/voter" },
  { name: "Results", icon: BarChart2, path: "/results" },
  { name: "Register", icon: LogIn, path: "/register" },
  { name: "TotalVoter", icon: LogIn, path: "/totalVoter" },
  { name: "Profile Admin", icon: LogIn, path: "/profile/Admin" },
  { name: "Settings", icon: ChevronUp, path: "/settings" },
];

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [open, setOpen] = useState(false); // ✅ sidebar toggle for mobile

  // ✅ Function for logging out
  const handleLogout = () => {
    localStorage.removeItem("login"); 
    navigate("/admin");
  };

  return (
    <div className="flex">
      {/* Toggle Button (mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-700 p-2 rounded-md text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Top: Title */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight">📘Election</h1>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
            {menus.map((item, index) => {
              const isActive = location.pathname === item.path;

              if (item.children) {
                return (
                  <div key={index}>
                    <button
                      onClick={() => setShowSubMenu((prev) => !prev)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-blue-700 hover:shadow transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {showSubMenu ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {showSubMenu && (
                      <div className="pl-12 flex flex-col gap-2 mt-2">
                        {item.children.map((child, i) => (
                          <Link
                            key={i}
                            to={child.path}
                            className={`text-sm px-2 py-2 rounded-lg hover:bg-blue-700 ${
                              location.pathname === child.path
                                ? "bg-white text-blue-700 font-bold"
                                : ""
                            }`}
                            onClick={() => setOpen(false)} // close sidebar on mobile
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-white text-blue-700 font-bold shadow-md"
                      : "hover:bg-blue-700 hover:shadow"
                  }`}
                  onClick={() => setOpen(false)} // ✅ close sidebar after click on mobile
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Logout */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-white text-blue-800 font-bold py-2 rounded-xl hover:bg-blue-100 transition"
          >
            ➕ LogOut
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
