import { useNavigate } from "react-router";
import React, { useState } from "react";


function Login() {
      const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ⚠️ Frontend-only credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
      <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border rounded-lg shadow-md w-[300px]"
      >
        <h1 className="text-2xl font-bold text-center text-[#791a0f]">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-[#791a0f] text-white p-2 rounded hover:bg-[#f58c81]"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login