import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../componets/SideBar';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF1493'];

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/results')
      .then(res => {
        console.log("Results:", res.data); // ← Hubi in 'image' ku jiro
        setResults(res.data);
      })
      .catch(err => console.error('Error fetching results:', err));
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-[250px]">
        <SideBar />
      </div>

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
                  {/* Sawirka Musharaxa */}
                  <img
                    src={
                      candidate.image
                        ? `http://localhost:3000/sawir/${candidate.image}`
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
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={results}>
                    <XAxis dataKey="Name" />
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
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={results}
                      dataKey="voteCount"
                      nameKey="Name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    >
                      {results.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Line Chart */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4 text-center">Line Chart</h3>
                <ResponsiveContainer width="100%" height={250}>
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

export default Results;
