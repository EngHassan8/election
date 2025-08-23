import React, { useState, useEffect } from 'react';
import SideBar from "../../componets/SideBar"; // your custom sidebar
import { BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { IoRefreshCircle } from 'react-icons/io5';
import { Toaster, toast } from 'react-hot-toast';

function Candidates() {
  const [showForm, setShowForm] = useState(false);

  // Candidate form fields
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [ID, setID] = useState('');
  const [Position, setPosition] = useState('');
  const [electionId, setElectionId] = useState('');
  const [image, setImage] = useState(null);

  const [candidates, setCandidates] = useState([]);
  const [TotalElection, setTotal] = useState(0);

  const [elections, setElections] = useState([]);
  const [loadingElections, setLoadingElections] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/get/election")
      .then((res) => {
        setElections(res.data);
        setLoadingElections(false);
      })
      .catch((err) => {
        console.error("Failed to fetch elections:", err);
        setLoadingElections(false);
      });

    handleGetCandidates();
    handleTotalE();
  }, []);

  const uniquePositions = [...new Set(elections.map(e => e.Position))];

  const handleTotalE = () => {
    axios.get("http://localhost:3000/total/election")
      .then((res) => setTotal(res.data.totalElection))
      .catch((err) => console.log(err));
  };

  const handleGetCandidates = () => {
    axios.get('http://localhost:3000/get/candidate')
      .then((response) => setCandidates(response.data))
      .catch((err) => {
        console.log(err);
        toast.error('Failed to fetch candidates');
      });
  };

  const handleNewCandidates = async (event) => {
    event.preventDefault();
    if (!image) { toast.error('Please upload an image'); return; }
    if (!electionId) { toast.error('Please select an election'); return; }

    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('Email', Email);
    formData.append('ID', ID);
    formData.append('Position', Position);
    formData.append('electionId', electionId);
    formData.append('img', image);

    try {
      await axios.post('http://localhost:3000/new/Candidates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Registered successfully');
      setShowForm(false);
      setName(''); setEmail(''); setID(''); setPosition(''); setElectionId(''); setImage(null);
      handleGetCandidates();
    } catch (error) {
      console.error('POST error:', error);
      toast.error('Failed to register candidate');
    }
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/remove/candidate/' + id)
      .then(() => {
        toast.success('Data has been deleted');
        setCandidates(prev => prev.filter(item => item._id !== id));
      })
      .catch(() => toast.error('Failed to delete candidate'));
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      <section className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">Candidates Management</h1>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
            Add Candidate
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
            <BarChart3 className="text-blue-500 w-10 h-10" />
            <div>
              <h2 className="text-3xl font-bold text-blue-700">{candidates.length}</h2>
              <p className="text-gray-600">Total Candidates</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4">
            <BarChart3 className="text-blue-500 w-10 h-10" />
            <div>
              <h2 className="text-3xl font-bold text-blue-700">{TotalElection}</h2>
              <p className="text-gray-600">Total Elections</p>
            </div>
          </div>
        </div>

        {/* Candidate Table */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">Candidate List</h1>
        <div className="bg-gray-100 p-6 rounded shadow-md">
          <div className="grid grid-cols-7 text-gray-700 font-semibold border-b pb-2 mb-4">
            <span>Image</span><span>Name</span><span>Email</span><span>ID</span><span>Position</span><span>Status</span><span>Actions</span>
          </div>

          {candidates.length > 0 ? candidates.map((item) => (
            <div key={item._id} className="grid grid-cols-7 border-b py-2 items-center text-sm text-gray-700">
              <img src={`http://localhost:3000/sawir/${item.image}`} alt="Candidate" className="w-10 h-10 rounded-full object-cover" />
              <span>{item.Name}</span><span>{item.Email}</span><span>{item.ID}</span><span>{item.Position}</span>
              <span><span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs">Active</span></span>
              <span className="flex gap-2 text-xl">
                <button className="text-blue-600" title="Refresh"><IoRefreshCircle /></button>
                <button onClick={() => handleDelete(item._id)} className="text-red-600" title="Delete Candidate"><MdDelete /></button>
              </span>
            </div>
          )) : (<p className="text-gray-500 text-center py-4">No candidates found.</p>)}
        </div>

        {/* Candidate Form Popup */}
        {showForm && (
          <div className="fixed inset-0 bg-blue-200 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl overflow-auto max-h-[90vh]">
              <h2 className="text-xl font-bold text-blue-800 mb-6">Add New Candidate</h2>
              <form onSubmit={handleNewCandidates} className="space-y-4">
                <input type="text" placeholder="Name" value={Name} onChange={e => setName(e.target.value)} required className="w-full border px-3 py-2 rounded" />
                <input type="email" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} required className="w-full border px-3 py-2 rounded" />
                <input type="text" placeholder="ID" value={ID} onChange={e => setID(e.target.value)} required className="w-full border px-3 py-2 rounded" />

                <select value={Position} onChange={e => setPosition(e.target.value)} required disabled={loadingElections} className="w-full border px-3 py-2 rounded">
                  <option value="">{loadingElections ? 'Loading positions...' : '-- Select Position --'}</option>
                  {uniquePositions.map((pos, i) => (<option key={i} value={pos}>{pos}</option>))}
                </select>

                <select value={electionId} onChange={e => setElectionId(e.target.value)} required disabled={loadingElections} className="w-full border px-3 py-2 rounded">
                  <option value="">{loadingElections ? 'Loading elections...' : '-- Select Election --'}</option>
                  {elections.map((el) => (<option key={el._id} value={el._id}>{el.Name}</option>))}
                </select>

                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required className="w-full" />

                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={toggleForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Candidate</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Toaster position="top-right" reverseOrder={false} />
      </section>
    </div>
  );
}

export default Candidates;
