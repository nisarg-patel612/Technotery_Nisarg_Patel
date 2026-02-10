import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // STATES (MISSING THE)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Already logged in check
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      navigate("/");
    }
  }, []);

  const loginHandler = () => {
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("admin", "true");
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Login
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Sign in to manage products
        </p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="input"
          placeholder="admin@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="input"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        onClick={loginHandler}
        className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-lg font-semibold transition"
      >
        Login
      </button>

      {/* Footer hint */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Admin access only
      </p>

    </div>
  </div>
);

}
