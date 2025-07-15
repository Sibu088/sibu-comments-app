import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function CommentForm({ gameId, onCommentAdded }) {
  const [text, setText] = useState("");

  const submitComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first!");

    try {
      const res = await axios.post(
        `${API}/comments`,
        { text, gameId }, // send gameId so backend knows which game
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setText("");

      // ✅ Pass the new comment back to parent
      if (onCommentAdded) onCommentAdded(res.data);
    } catch (error) {
      alert("Failed to post comment");
    }
  };

  return (
    <form onSubmit={submitComment}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment"
        required
      />
      <button type="submit">Post</button>
    </form>
  );
}
