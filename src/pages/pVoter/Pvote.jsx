import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SideVoter from "../../componets/SideVoter";

const BASE_URL = "https://your-backend.onrender.com"; // <== Halkan geli URL-ka backend-kaaga

function Pvote() {
  const [Name, setName] = useState("");
  const [ID, setID] = useState("");
  const [user, setUser] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [votedPositions, setVotedPositions] = useState({});
  const [openPosition, setOpenPosition] = useState(null);
  const [loadingVote, setLoadingVote] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("voterUser"));
    if (storedUser?.ID) {
      setUser(storedUser);
      fetchCandidates();
      fetchVotedPositions(storedUser.ID);
    }
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get/candidate`);
      setCandidates(res.data);
    } catch (error) {
      toast.error("Error fetching candidates");
    }
  };

  const fetchVotedPositions = async (voterId) => {
    try {
      const res = await axios.get(`${BASE_URL}/vote/checkAll?voterId=${voterId}`);
      const votedMap = {};
      if (res.data.votedPositions) {
        res.data.votedPositions.forEach((vote) => {
          votedMap[vote.position] = vote.candidateId.toString();
        });
      }
      setVotedPositions(votedMap);
    } catch (error) {
      toast.error("Error fetching your votes");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/admin/voter`, { Name, ID });
      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("voterUser", JSON.stringify(res.data.data));
        setUser(res.data.data);
        fetchCandidates();
        fetchVotedPositions(res.data.data.ID);
      } else {
        toast.error("Incorrect Name or ID");
      }
    } catch (error) {
      toast.error("Server error during login");
    }
  };

  const togglePositionView = (Position) => {
    setOpenPosition((prev) => (prev === Position ? null : Position));
  };

  const handleVote = async (candidateId, Position) => {
    if (!user?.ID) return toast.error("Fadlan login ku samee marka hore.");
    if (votedPositions[Position])
      return toast.error(`Waad horey u codeysay booska ${Position}!`);

    try {
      setLoadingVote(true);
      await axios.post(`${BASE_URL}/vote`, { candidateId, voterId: user.ID, Position });
      await fetchVotedPositions(user.ID);
      await fetchCandidates();
      toast.success("Codkaaga waa la diiwaangeliyay!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Cod bixinta waa fashilantay.");
    } finally {
      setLoadingVote(false);
    }
  };

  const uniquePositions = [...new Set(candidates.map((c) => c.Position))];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Toaster position="top-right" />
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Fadlan Gala Account kaaga</h2>
          <input
            type="text"
            placeholder="Magacaaga"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full mb-4 rounded"
          />
          <input
            type="text"
            placeholder="ID-gaaga"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            required
            className="border p-2 w-full mb-4 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="md:w-[260px] w-full"><SideVoter /></div>
      <Toaster position="top-right" />
      <div className="flex-1 max-w-6xl mx-auto px-10 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Doorashooyinka</h1>
          <p className="text-gray-700">Team Qaran 2025 | Doorashada guud ee ardayda</p>
        </header>
        {uniquePositions.length === 0 ? (
          <p className="text-gray-500">Musharax lama helin.</p>
        ) : (
          uniquePositions.map((Position) => (
            <section key={Position} className="mb-12">
              <div className="flex justify-between items-center bg-gray-100 p-5 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-blue-700">{Position}</h2>
                <button
                  onClick={() => togglePositionView(Position)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {openPosition === Position ? "Qarso Musharaxiinta" : "Muuji Musharaxiinta"}
                </button>
              </div>
              {openPosition === Position && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {candidates
                    .filter((c) => c.Position === Position)
                    .map((candidate) => {
                      const hasVoted = votedPositions[Position];
                      const isUserVote = hasVoted === candidate._id;
                      return (
                        <div
                          key={candidate._id}
                          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-2xl transition transform hover:scale-105"
                        >
                          <img
                            src={`${BASE_URL}/sawir/${candidate.image}`}
                            alt={candidate.Name}
                            className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-500"
                          />
                          <h3 className="text-xl font-semibold mb-2 text-center">{candidate.Name}</h3>
                          <p className="text-blue-700 font-bold text-lg mb-4">Codad: {candidate.voteCount ?? 0}</p>

                          {!isUserVote && !hasVoted && (
                            <button
                              onClick={() => handleVote(candidate._id, Position)}
                              disabled={loadingVote || votedPositions[Position]}
                              className={`w-full py-3 rounded-full font-semibold text-white ${
                                loadingVote || votedPositions[Position]
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-600 hover:bg-blue-700 transition"
                              }`}
                            >
                              {loadingVote ? "Fadlan sug..." : "Codee"}
                            </button>
                          )}

                          {isUserVote && (
                            <button
                              disabled
                              className="w-full py-3 rounded-full font-semibold text-white bg-green-600 cursor-default"
                            >
                              Waad Codeysay
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
}

export default Pvote;
