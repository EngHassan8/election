import React, { useState, useEffect } from 'react';
import SideBar from "../../componets/SideBar";
import { BarChart3, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { IoRefreshCircle } from "react-icons/io5";

function Elections() {
  const [showForm, setShowForm] = useState(false);
  const [Name, setName] = useState('');
  const [Position, setPosition] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [elections, setElections] = useState([]);
  const [TotalElection, setTotal] = useState(0);

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || "https://back-24vm.onrender.com";

  useEffect(() => {
    fetchElections();
    fetchTotalElections();
  }, []);

  const fetchElections = () => {
    axios.get(`${API_BASE}/get/election`)
      .then((res) => setElections(res.data))
      .catch((err) => console.error("Failed to fetch elections:", err));
  };

  const fetchTotalElections = () => {
    axios.get(`${API_BASE}/total/election`)
      .then((res) => setTotal(res.data.totalElection))
      .catch((err) => console.log(err));
  };

  const HandleNewElection = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/new/election`, { Name, Position, StartDate, EndDate })
      .then(() => {
        toast.success("Election created!");
        setShowForm(false);
        fetchElections();
        fetchTotalElections();
      })
      .catch(() => toast.error("Error creating election"));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE}/remove/election/${id}`)
      .then(() => {
        toast.success("Election deleted");
        setElections(prev => prev.filter(item => item._id !== id));
        fetchTotalElections();
      })
      .catch(() => toast.error("Error deleting election"));
  };

  const toggleForm = () => setShowForm(!showForm);

  // Helper to get status
  const getElectionStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (now < startDate) return { text: "Upcoming", color: "yellow" };
    if (now >= startDate && now <= endDate) return { text: "Active", color: "green" };
    return { text: "Finished", color: "gray" };
  };

  return (
    <div className='flex bg-gray-50 min-h-screen'>
      <SideBar />
      <section className='flex-1 p-8'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl font-bold text-blue-800'>Election Management System</h1>
          <button onClick={toggleForm} className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition'>
            Create Election
          </button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10'>
          <StatCard icon={<BarChart3 className='text-blue-500 w-10 h-10' />} value={elections.length} label="Total Elections" />
          <StatCard icon={<CheckCircle className='text-green-500 w-10 h-10' />} value={TotalElection} label="Active Elections" />
          <StatCard icon={<Clock className='text-yellow-500 w-10 h-10' />} value={elections.filter(e => getElectionStatus(e.StartDate, e.EndDate).text === 'Upcoming').length} label="Upcoming Elections" />
        </div>

        {/* Election List */}
        <h1 className='text-xl font-bold text-gray-800 mb-4'>Direction Elections</h1>
        <div className='bg-gray-100 p-6 rounded shadow-md'>
          <div className='grid grid-cols-5 text-gray-700 font-semibold border-b pb-2 mb-4'>
            <span>Election</span>
            <span>Position</span>
            <span>Details</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {elections.length > 0 ? elections.map((election) => {
            const status = getElectionStatus(election.StartDate, election.EndDate);
            const colorClasses = {
              green: "bg-green-100 text-green-700",
              yellow: "bg-yellow-100 text-yellow-700",
              gray: "bg-gray-200 text-gray-700"
            };
            return (
              <div key={election._id} className='grid grid-cols-5 text-gray-700 border-b py-2 items-center'>
                <span>{election.Name}</span>
                <span>{election.Position}</span>
                <span>
                  <p className='text-sm'>Start: {new Date(election.StartDate).toLocaleDateString()}</p>
                  <p className='text-sm'>End: {new Date(election.EndDate).toLocaleDateString()}</p>
                </span>
                <span>
                  <span className={`px-3 py-1 rounded-full text-xs ${colorClasses[status.color]}`}>{status.text}</span>
                </span>
                <span className='flex gap-4 text-2xl'>
                  <button className='text-blue-600'><IoRefreshCircle /></button>
                  <button onClick={() => handleDelete(election._id)} className='text-red-600'><MdDelete /></button>
                </span>
              </div>
            );
          }) : <p className='text-gray-500'>No election data available...</p>}
        </div>

        {/* Create Election Form */}
        {showForm && (
          <div className='fixed inset-0 bg-blue-200 bg-opacity-40 flex items-center justify-center z-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-xl'>
              <h2 className='text-xl font-bold text-blue-800 mb-6'>Create New Election</h2>
              <form onSubmit={HandleNewElection} className='space-y-4'>
                <InputField label="Election Name" value={Name} onChange={setName} />
                <InputField label="Position" value={Position} onChange={setPosition} />
                <div className='flex gap-4'>
                  <InputField label="Start Date" type="date" value={StartDate} onChange={setStartDate} className="flex-1" />
                  <InputField label="End Date" type="date" value={EndDate} onChange={setEndDate} className="flex-1" />
                </div>
                <div className='flex justify-end gap-3 pt-4'>
                  <button type="button" onClick={toggleForm} className='bg-gray-300 px-4 py-2 rounded'>Cancel</button>
                  <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded'>Save Election</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
      <Toaster />
    </div>
  );
}

// Reusable stat card
const StatCard = ({ icon, value, label }) => (
  <div className='bg-white shadow-md rounded-lg p-5 flex items-center gap-4'>
    {icon}
    <div>
      <h2 className='text-3xl font-bold text-gray-700'>{value}</h2>
      <p className='text-gray-600'>{label}</p>
    </div>
  </div>
);

// Reusable input field
const InputField = ({ label, type="text", value, onChange, className="" }) => (
  <div className={className}>
    <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
      className='w-full border border-gray-300 rounded px-3 py-2'
    />
  </div>
);

export default Elections;
