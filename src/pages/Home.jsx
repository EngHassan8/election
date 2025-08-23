import React from 'react';
import { FaUsers, FaVoteYea, FaFileAlt, FaUserCheck, FaRegNewspaper } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Header  from "../componets/Header"

export default function ElectionHome() {
  return (
    <div> 
      <Header/>
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
   

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to the Future of Elections</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg">Secure, transparent, and efficient election management at your fingertips.</p>
    <NavLink to="/Dashbord">
       <button className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded shadow hover:bg-yellow-300 transition">
          Get Started
        </button>   </NavLink> 
    <NavLink to="/dashVoter">
       <button className="bg-yellow-400 ml-10 text-blue-900 font-semibold px-6 py-3 rounded shadow hover:bg-yellow-300 transition">
          Voter 
        </button>   </NavLink> 
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <FaUsers className="text-blue-600 mx-auto mb-3" size={40} />
          <h3 className="text-2xl font-bold">1,250,000</h3>
          <p>Registered Voters</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <FaVoteYea className="text-green-600 mx-auto mb-3" size={40} />
          <h3 className="text-2xl font-bold">3,200</h3>
          <p>Votes Cast Today</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <FaFileAlt className="text-purple-600 mx-auto mb-3" size={40} />
          <h3 className="text-2xl font-bold">45</h3>
          <p>Election Reports</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <FaUserCheck className="text-red-600 mx-auto mb-3" size={40} />
          <h3 className="text-2xl font-bold">120</h3>
          <p>Verified Candidates</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <FaUsers className="text-blue-600 mx-auto mb-4" size={50} />
              <h3 className="text-xl font-semibold mb-2">Voter Registration</h3>
              <p>Easy and secure registration process with verification.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <FaUserCheck className="text-green-600 mx-auto mb-4" size={50} />
              <h3 className="text-xl font-semibold mb-2">Candidate Management</h3>
              <p>Manage candidate profiles and track their election status.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <FaFileAlt className="text-purple-600 mx-auto mb-4" size={50} />
              <h3 className="text-xl font-semibold mb-2">Real-time Reporting</h3>
              <p>Get live election results and detailed analytics dashboards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Section */}
      <section id="candidates" className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Candidates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Example candidate card */}
            {[
              { name: 'Ali Mohamed', party: 'Peace Party', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Fadumo Warsame', party: 'Unity Movement', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Hassan Abdi', party: 'Progressive Alliance', img: 'https://randomuser.me/api/portraits/men/56.jpg' },
              { name: 'Amina Yusuf', party: 'Democracy Front', img: 'https://randomuser.me/api/portraits/women/67.jpg' },
            ].map((candidate, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                <img
                  src={candidate.img}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.party}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voter Registration Call-to-Action */}
      <section id="register" className="bg-blue-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Register to Vote Today</h2>
        <p className="mb-8 max-w-lg mx-auto">Join millions of voters and make your voice heard in the upcoming elections.</p>
        <button className="bg-yellow-400 text-blue-900 font-semibold px-8 py-4 rounded shadow hover:bg-yellow-300 transition">
          Register Now
        </button>
      </section>

      {/* Recent News */}
      <section id="news" className="container mx-auto py-16 px-6 max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">Latest News & Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Election date announced',
              summary: 'The national election commission has announced the election date as October 15th, 2025.',
              icon: <FaRegNewspaper className="text-indigo-600 mb-3" size={40} />,
            },
            {
              title: 'New voter registration portal launched',
              summary: 'A new easy-to-use portal for voter registration is now live across the country.',
              icon: <FaRegNewspaper className="text-indigo-600 mb-3" size={40} />,
            },
            {
              title: 'Candidate debates scheduled',
              summary: 'Debates among candidates will be broadcast live starting next month.',
              icon: <FaRegNewspaper className="text-indigo-600 mb-3" size={40} />,
            },
          ].map((news, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              {news.icon}
              <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
              <p className="text-gray-700">{news.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 text-center">
        <p>© 2025 Election Management System. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}
