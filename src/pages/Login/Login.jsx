// src/pages/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blogpostbackend-e1f0.onrender.com/api/auth/login", {
        email,
        password,
      });
      const data = response.data;

      // Save the token to localStorage
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true); // Update login state
      alert("Login successful!");
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto my-28 p-6 border border-gray-300 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Do not have an account?{" "}
        <span
          onClick={() => navigate('/signup')}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
