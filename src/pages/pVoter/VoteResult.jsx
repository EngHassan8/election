import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideVoter from "../../componets/SideVoter";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF1493'];

function VoteResult() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://back-1-374m.onrender.com/results')
      .then(res => {
        setResults(res.data);
      })
      .catch(err => console.error('Error fetching results:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-[250px]">
        <SideVoter />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Natiijooyinka Codbixinta
        </h2>

        {results.length === 0 ? (
          <p className="text-center text-gray-500">Wax natiijo ah lama helin.</p>
        ) : (
          <>
            {/* Candidate List */}
            <div className="flex flex-col gap-4 mb-12">
              {results.map(candidate => (
                <div
                  key={candidate._id}
                  className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-6 hover:shadow-xl transition"
                >
                  <img
                    src={
                      candidate.image
                        ? `https://back-1-374m.onrender.com/sawir/${candidate.image}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={candidate.Name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-800">{candidate.Name}</h3>
                    <p className="text-gray-600 mt-1">Tirada Codadka</p>
                    <p className="text-2xl font-bold text-green-600">
                      {candidate.voteCount ?? 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bar Chart */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4 text-center">Bar Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results} margin={{ bottom: 70 }}>
                    <XAxis 
                      dataKey="Name"
                      interval={0}
                      tick={({ x, y, index }) => {
                        const candidate = results[index];
                        return (
                          <g transform={`translate(${x},${y + 10})`}>
                            <image
                              href={
                                candidate?.image
                                  ? `https://back-1-374m.onrender.com/sawir/${candidate.image}`
                                  : "https://via.placeholder.com/30"
                              }
                              x={-15}
                              y={0}
                              width={30}
                              height={30}
                            />
                            <text x={0} y={45} textAnchor="middle" fill="#333" fontSize={10}>
                              {candidate?.Name}
                            </text>
                          </g>
                        );
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="voteCount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4 text-center">Pie Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={results}
                      dataKey="voteCount"
                      nameKey="Name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      label={({ name }) => name}
                    >
                      {results.map((entry, index) => (
                        <Cell key={`cell-${entry._id}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Line Chart */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4 text-center">Line Chart</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results}>
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="voteCount" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VoteResult;
