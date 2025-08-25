import React, { useEffect } from "react";
import SideVoter from "../../componets/SideVoter";
import { Clock, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashVoter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lock = localStorage.getItem("lock");

    if (!lock || lock === "null" || lock === "undefined") {
      navigate("/adminVoter");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="md:w-[260px] w-full">
        <SideVoter />
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Title Section */}
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Ku Soo Dhawoow Voter Dashboard-ka!
          </h1>
          <p className="text-gray-600">
            Halkan waxaad ka arki doontaa xogta muhiimka ah ee ku saabsan doorashada, digniino, iyo warbixinaha muhiimka ah.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl shadow flex items-center gap-4">
            <Users size={36} className="text-blue-700" />
            <div>
              <p className="text-sm text-gray-600">Tirada Guud ee Diiwaan Gashan</p>
              <p className="text-xl font-bold text-blue-800">1,245</p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow flex items-center gap-4">
            <Calendar size={36} className="text-yellow-700" />
            <div>
              <p className="text-sm text-gray-600">Doorashada Soo Socota</p>
              <p className="text-xl font-bold text-yellow-800">25 June 2025</p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow flex items-center gap-4">
            <Clock size={36} className="text-green-700" />
            <div>
              <p className="text-sm text-gray-600">Waqtiga Haray</p>
              <p className="text-xl font-bold text-green-800">8 Maalmood</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Talooyinka Cod-bixiyayaasha
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Hubi in macluumaadkaaga diiwaangelinta sax yahay.</li>
            <li>Doorashada waxay bilaaban doontaa 7:00 subaxnimo – 5:00 galabnimo.</li>
            <li>Ha iloobin inaad keento aqoonsigaaga (ID card).</li>
            <li>Ka fogow wax isdaba marin ah ama fal sharci darro ah.</li>
            <li>Warbixinta cod bixinta waxaad ka heli kartaa dashboard-kan.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashVoter;
