import React, { useState, useEffect } from 'react';
import SideBar from "../../componets/SideBar";
import { BarChart3, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
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

  useEffect(() => {
    fetchElections();
    fetchTotalElections();
  }, []);

  const fetchElections = async () => {
    try {
      const res = await axios.get("https://back-1-374m.onrender.com/get/election");
      setElections(res.data);
    } catch (err) {
      toast.error("Failed to fetch elections");
      console.error(err);
    }
  };

  const fetchTotalElections = async () => {
    try {
      const res = await axios.get("https://back-1-374m.onrender.com/total/election");
      setTotal(res.data.totalElection);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewElection = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://back-1-374m.onrender.com/new/election", {
        Name,
        Position,
        StartDate,
        EndDate
      });
      toast.success("Election created successfully!");
      setShowForm(false);
      resetForm();
      fetchElections();
      fetchTotalElections();
    } catch (err) {
      toast.error("Error creating election");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://back-1-374m.onrender.com/remove/election/${id}`);
      toast.success("Election deleted");
      setElections(prev => prev.filter(item => item._id !== id));
      fetchTotalElections();
    } catch (err) {
      toast.error("Error deleting election");
      console.error(err);
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  const resetForm = () => {
    setName('');
    setPosition('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className='flex bg-gray-50 min-h-screen'>
      <SideBar />

      <section className='flex-1 p-8'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl font-bold text-blue-800'>Election Management</h1>
          <button 
            onClick={toggleForm} 
            className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition'>
            Create Election
          </button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10'>
          <div className='bg-white shadow-md rounded-lg p-5 flex items-center gap-4'>
            <BarChart3 className='text-blue-500 w-10 h-10' />
            <div>
              <h2 className='text-3xl font-bold text-blue-700'>{elections.length}</h2>
              <p className='text-gray-600'>Total Elections</p>
            </div>
          </div>
          <div className='bg-white shadow-md rounded-lg p-5 flex items-center gap-4'>
            <CheckCircle className='text-green-500 w-10 h-10' />
            <div>
              <h2 className='text-3xl font-bold text-green-700'>{TotalElection}</h2>
              <p className='text-gray-600'>Active Elections</p>
            </div>
          </div>
          <div className='bg-white shadow-md rounded-lg p-5 flex items-center gap-4'>
            <Clock className='text-yellow-500 w-10 h-10' />
            <div>
              <h2 className='text-3xl font-bold text-yellow-700'>0</h2>
              <p className='text-gray-600'>Upcoming Elections</p>
            </div>
          </div>
        </div>

        {/* Election Table */}
        <h1 className='text-xl font-bold text-gray-800 mb-4'>Current Elections</h1>
        <div className='bg-gray-100 p-6 rounded shadow-md'>
          <div className='grid grid-cols-5 text-gray-700 font-semibold border-b pb-2 mb-4'>
            <span>Election</span>
            <span>Position</span>
            <span>Details</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {elections.length > 0 ? elections.map((election) => (
            <div key={election._id} className='grid grid-cols-5 text-gray-700 border-b py-2'>
              <span>{election.Name}</span>
              <span>{election.Position}</span>
              <span>
                <p className='text-sm'>Start: {new Date(election.StartDate).toLocaleDateString()}</p>
                <p className='text-sm'>End: {new Date(election.EndDate).toLocaleDateString()}</p>
              </span>
              <span>
                <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs'>Active</span>
              </span>
              <span className='flex gap-4 text-2xl'>
                <button className='text-blue-600'><IoRefreshCircle /></button>
                <button onClick={() => handleDelete(election._id)} className='text-red-600'><MdDelete/></button>
              </span>
            </div>
          )) : (
            <p className='text-gray-500 text-center py-4'>No election data available...</p>
          )}
        </div>

        {/* New Election Form */}
        {showForm && (
          <div className='fixed inset-0 bg-blue-200 bg-opacity-40 flex items-center justify-center z-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-xl'>
              <h2 className='text-xl font-bold text-blue-800 mb-6'>Create New Election</h2>
              <form onSubmit={handleNewElection} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Election Name</label>
                  <input 
                    type="text" 
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Position</label>
                  <input 
                    type="text" 
                    value={Position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                    className='w-full border border-gray-300 rounded px-3 py-2'
                  />
                </div>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Start Date</label>
                    <input 
                      type="date" 
                      value={StartDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className='w-full border border-gray-300 rounded px-3 py-2'
                    />
                  </div>
                  <div className='flex-1'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>End Date</label>
                    <input 
                      type="date" 
                      value={EndDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className='w-full border border-gray-300 rounded px-3 py-2'
                    />
                  </div>
                </div>
                <div className='flex justify-end gap-3 pt-4'>
                  <button type="button" onClick={toggleForm} className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'>Cancel</button>
                  <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Save Election</button>
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

export default Elections;
