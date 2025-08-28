import React, { useState } from 'react';
// import logo from '../assets/logo.jpg'; // beddel haddii aad leedahay logo cusub
import { NavLink } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBarChart2,
  FiMail,
} from 'react-icons/fi';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative shadow-sm sticky top-0 bg-white z-50">
      <div className="flex px-6 justify-between items-center py-2">
        {/* Left - Logo and Title */}
        <div className="flex gap-3 items-center font-bold">
          {/* <img className="w-[40px] h-[40px] rounded-full" src={logo} alt="logo" /> */}
          <h1 className="text-black font-mono text-xl font-bold">
            Digital <span className='text-blue-600'>Election</span> System
          </h1>
        </div>

        {/* Center - Nav Links (Desktop) */}
        <ul className="text-xl font-semibold sm:flex gap-8 hidden">
          <NavLink to="/" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600"> Home</NavLink>
          <NavLink to="/about" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600">About</NavLink>
          <NavLink to="/contact" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-600"> Contact</NavLink>
        </ul>

        {/* Right - Get Started Button (Desktop) */}
        <div className="sm:flex hidden">
          <NavLink to="/register">
            <button className="border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
              
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu}>
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full w-52 bg-white shadow-md z-50 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <FiX size={24} />
          </button>
        </div>
        <div className="flex flex-col items-start px-6 gap-5 font-bold text-base">
          <NavLink to="/" onClick={toggleMenu} className="flex items-center gap-2"><FiHome /> Home</NavLink>
          <NavLink to="/about" onClick={toggleMenu} className="flex items-center gap-2"><FiUsers /> About   </NavLink>
          <NavLink to="/contact" onClick={toggleMenu} className="flex items-center gap-2"><FiMail /> Contact</NavLink>
          <NavLink to="/login" onClick={toggleMenu} className="flex items-center gap-2"><FiBarChart2 /> Login</NavLink>
          <NavLink to="/" onClick={toggleMenu}>
            <button className="border border-blue-600 px-4 py-2 rounded mt-4">
              Get started 
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
