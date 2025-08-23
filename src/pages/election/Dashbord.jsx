import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../componets/SideBar"; // ← your custom sidebar
import { Users, UserCheck, Vote, Timer, BarChart3 } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const navigate = useNavigate();

  // Backend base URL
  const API_BASE = process.env.REACT_APP_API_URL || "https://back-24vm.onrender.com";

  // Check login
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      navigate("/admin");
    }
  }, [navigate]);

  // Fetch totals from backend
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const votersRes = await axios.get(`${API_BASE}/total`);
        console.log("Voters:", votersRes.data);
        setTotalVoters(votersRes.data.total || 0);

        const candidatesRes = await axios.get(`${API_BASE}/total/election`);
        console.log("Candidates:", candidatesRes.data);
        setTotalCandidates(candidatesRes.data.totalElection || 0);
      } catch (err) {
        console.error("Error fetching totals:", err);
      }
    };

    fetchTotals();
  }, [API_BASE]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      <div className="flex-1 p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-900 drop-shadow">
          🗳️ Election Management Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <InfoCard
            icon={<Users className="text-blue-800" />}
            title="Total Voters"
            value={totalVoters}
            bg="blue"
          />
          <InfoCard
            icon={<UserCheck className="text-green-800" />}
            title="Candidates"
            value={totalCandidates}
            bg="green"
          />
          <InfoCard
            icon={<Vote className="text-purple-800" />}
            title="Votes Cast"
            value="9,850"
            bg="purple"
          />
          <InfoCard
            icon={<Timer className="text-red-800" />}
            title="Status"
            value="Ongoing"
            bg="red"
          />
        </div>

        <div className="bg-white p-6 shadow-md rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Voting Results Chart
            </h2>
          </div>
          <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
            📊 Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon, title, value, bg }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-900",
    green: "bg-green-100 text-green-900",
    purple: "bg-purple-100 text-purple-900",
    red: "bg-red-100 text-red-900",
  };

  return (
    <div className={`p-6 shadow-md rounded-xl hover:shadow-xl transition ${colors[bg]}`}>
      <div className="flex items-center gap-4 mb-2">
        {icon}
        <h2 className={`font-medium`}>{title}</h2>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Dashboard;
