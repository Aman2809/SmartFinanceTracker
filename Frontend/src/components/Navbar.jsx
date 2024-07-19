import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-20 py-4 bg-transparent absolute top-0 left-0 w-full z-10">
      <div className="flex items-center space-x-4">
        <img src="/path/to/logo.png" alt="Origin Logo" className="h-8" />
        <h2 className="text-2xl font-bold text-black">Financfy</h2>
      </div>
      <ul className="flex space-x-8 text-black">
        <NavLink to="/" className=" hover:text-lg  font-bold transition-all duration-300"><li>Home</li></NavLink>
        <NavLink to="/features" className="hover:text-lg  font-bold transition-all duration-300"><li>Dashboard</li></NavLink>
        <NavLink to="/about" className=" hover:text-lg  font-bold transition-all duration-300"><li>About</li></NavLink>
        <NavLink to="/faq" className= "hover:text-lg  font-bold transition-all duration-300"><li>FAQ</li></NavLink>
      </ul>
      <div className="flex space-x-2">
        <button className="px-4 py-2 text-black font-bold rounded hover:text-black">Log in</button>
        <button className="px-4 py-2 text-black  font-bold rounded bg-pink-300 hover:bg-pink-400">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;