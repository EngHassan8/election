import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart2,
  LogOut as LogOutIcon,
  Settings,
  Users,
} from "lucide-react";

const menus = [
  { name: "Vote", icon: BarChart2, path: "/Pvote" },
  { name: "voteResult", icon: BarChart2, path: "/voteResult" },
  { name: "Profile", icon: Users, path: "/profile" },
];

const SideVoter = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lock = localStorage.getItem("lock");

    if (!lock || lock === "null" || lock === "undefined") {
      navigate("/adminVoter");
    }
  }, []);

  const LogOut = () => {
    localStorage.removeItem("lock");
    localStorage.removeItem("voterUser"); // optional
    navigate("/adminVoter");
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-lg flex flex-col justify-between">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold mb-8">📥 Voter Panel</h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menus.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-white text-blue-800 font-semibold shadow-md"
                    : "hover:bg-blue-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={LogOut}
          className="w-full flex items-center justify-center gap-2 bg-white text-blue-800 font-bold py-2 rounded-xl hover:bg-blue-100 transition"
        >
          <LogOutIcon className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default SideVoter;
