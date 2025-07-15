import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/auth/login`, form);

      console.log("Login response:", res.data); // ✅ for debugging

      if (!res.data.token) {
        alert("Login failed: No token received");
        return;
      }

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      // Set user logged in
      setUser(true);

      // Navigate to homepage
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
