import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Home from "./pages/Home";
import Logout from "./pages/logout";
import Wishlist from "./pages/Wishlist"; // ✅ Import the Wishlist page
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setUser(true);
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="/wishlist" element={<Wishlist />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
