// src/components/Header.jsx
import React from "react";
import './Header.css'; // Import the external CSS
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-container">
      <h1>Hi</h1>
      <h1>Welcome to My Blog</h1>
      <button className="h-10 w-36 bg-slate-700 rounded-2xl text-white">
        <NavLink to="/createPost" className="text-white no-underline">Create Post</NavLink>
      </button>
    </header>
  );
};

export default Header;
