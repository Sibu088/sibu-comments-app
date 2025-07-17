import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      if (onLogin) onLogin(res.data.user);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
