import React from "react";

export default function CommentList({ comments }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {comments.map((c) => (
        <li
          key={c._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem 0",
            borderBottom: "1px solid #ccc",
          }}
        >
          <span>
            <strong>{c.user?.username}:</strong> {c.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
