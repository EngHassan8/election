import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../componets/SideBar';

function Voter() {
  const [candidates, setCandidates] = useState([]);
  const [votedCandidateId, setVotedCandidateId] = useState(null);
  const [openPosition, setOpenPosition] = useState(null);

  // Load on mount
  useEffect(() => {
    const voter = JSON.parse(localStorage.getItem("voterUser"));
    if (voter?.ID) {
      axios
        .get(`https://back-1-374m.onrender.com/vote/check?voterId=${voter.ID}`)
        .then((res) => {
          if (res.data.voted) {
            setVotedCandidateId(res.data.candidateId);
          }
        })
        .catch((err) => {
          console.error('Error checking vote:', err);
        });
    }

    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axios.get('https://back-1-374m.onrender.com/get/candidate')
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error('Error fetching candidates:', err);
      });
  };

  const togglePositionView = (position) => {
    setOpenPosition(openPosition === position ? null : position);
  };

  const handleVote = async (candidateId) => {
    const voter = JSON.parse(localStorage.getItem("voterUser"));
    if (!voter?.ID) {
      alert("Fadlan marka hore login samee.");
      return;
    }

    if (votedCandidateId) {
      alert('Waad horey u codaysay!');
      return;
    }

    try {
      await axios.post('https://back-1-374m.onrender.com/vote', {
        candidateId,
        voterId: voter.ID,
      });

      setVotedCandidateId(candidateId);
      alert('Codkaaga waa la diiwaangeliyay!');

      // Update vote count locally
      setCandidates((prev) =>
        prev.map((c) =>
          c._id === candidateId
            ? { ...c, voteCount: (c.voteCount || 0) + 1 }
            : c
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Cod bixinta waa fashilantay.');
    }
  };

  // Fix: spelling mistake ("Postion" → "Position")
  const uniquePositions = Array.from(
    new Set(candidates.map((c) => c.Position || c.Postion))
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <SideBar />

      <div className="w-full p-6 max-w-6xl mx-auto mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Doorashooyinka</h2>
          <p className="text-gray-600">Team Qaran 2025 | Doorashada guud ee ardayda</p>
          <p className="text-gray-600">29/9/2025 – 1:00</p>
        </div>

        {uniquePositions.length === 0 && (
          <p className="text-gray-500">Musharax lama helin.</p>
        )}

        {uniquePositions.map((position) => (
          <div key={position} className="mb-10">
            <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded">
              <h3 className="text-xl font-semibold text-blue-700">{position}</h3>
              <button
                onClick={() => togglePositionView(position)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {openPosition === position ? 'Hide Candidates' : 'View Candidates'}
              </button>
            </div>

            {openPosition === position && (
              <div className="flex flex-wrap gap-8">
                {candidates
                  .filter((c) => (c.Position || c.Postion) === position)
                  .map((candidate) => (
                    <div
                      key={candidate._id}
                      className="bg-white border p-6 rounded-lg shadow flex flex-col items-center w-72 hover:shadow-lg transition"
                    >
                      <img
                        src={`https://back-1-374m.onrender.com/sawir/${candidate.image}`}
                        alt={candidate.Name}
                        className="w-24 h-24 rounded-full object-cover mb-3"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {candidate.Name}
                      </h3>
                      <p className="text-blue-700 font-bold text-lg">
                        Codad: {candidate.voteCount ?? 0}
                      </p>

                      <button
                        onClick={() => handleVote(candidate._id)}
                        disabled={!!votedCandidateId}
                        className={`mt-4 px-4 py-2 rounded-full transition 
                          ${votedCandidateId
                            ? votedCandidateId === candidate._id
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                      >
                        {votedCandidateId === candidate._id ? 'You Voted' : 'Vote'}
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Voter;
