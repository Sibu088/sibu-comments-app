import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function GameCard({ gameId, title, description, image, video }) {
  const [comments, setComments] = useState([]);
  const [relatedGames, setRelatedGames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API}/comments/${gameId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    fetchComments();
  }, [gameId]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  // Fetch related games
  useEffect(() => {
    const fetchRelatedGames = async () => {
      try {
        const res = await axios.get(`https://www.freetogame.com/api/games?platform=pc`);
        const filtered = res.data.filter((game) =>
          game.title.toLowerCase().includes(title.toLowerCase().split(":")[0])
        );
        setRelatedGames(filtered.slice(0, 2));
      } catch (err) {
        console.error("Failed to fetch related free games:", err);
      }
    };
    fetchRelatedGames();
  }, [title]);

  const handlePlay = () => setIsPlaying(true);
  const handleVideoEnd = () => setIsPlaying(false);

  const handleAddToWishlist = () => {
    const btn = document.getElementById(`wishlist-btn-${gameId}`);
    if (btn) {
      btn.classList.add("clicked");
      setTimeout(() => {
        btn.classList.remove("clicked");
        navigate("/wishlist");
      }, 700);
    }
  };

  return (
    <div
      className="game-card"
      style={{
        marginBottom: "2rem",
        borderRadius: "12px",
        padding: "1rem",
        background: "#111",
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        transition: "transform 0.3s ease",
        maxWidth: "400px",
        margin: "auto",
        position: "relative",
      }}
    >
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            background: "red",
            color: "white",
            top: "10px",
            left: "-25px",
            transform: "rotate(-45deg)",
            padding: "5px 40px",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: "2",
          }}
        >
          TRAILER
        </div>
      )}

      {!isPlaying ? (
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: "10px",
          }}
          onClick={handlePlay}
        >
          <img
            src={image}
            alt={title}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "50%",
              padding: "15px",
            }}
          >
            <span style={{ fontSize: "30px", color: "#fff" }}>▶</span>
          </div>
        </div>
      ) : (
        <video
          src={video}
          controls
          autoPlay
          onEnded={handleVideoEnd}
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}

      <div className="game-content" style={{ marginTop: "1rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
        <p style={{ fontSize: "14px", color: "#ccc" }}>{description}</p>

        <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={tagStyle}>Action</span>
          <span style={tagStyle}>Multiplayer</span>
          <span style={tagStyle}>PS5</span>
        </div>

        {/* Creative Add to Wishlist */}
        <button
          id={`wishlist-btn-${gameId}`}
          className="wishlist-btn"
          onClick={handleAddToWishlist}
        >
          ❤️ Add to Wishlist
        </button>

        {relatedGames.length > 0 && (
          <div style={{ marginTop: "1.5rem" }}>
            <h4 style={{ fontSize: "16px", marginBottom: "0.5rem" }}>
              Free Alternatives:
            </h4>
            <ul>
              {relatedGames.map((g) => (
                <li key={g.id}>
                  <a
                    href={g.game_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#58a6ff" }}
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "1.5rem" }}>
          <CommentForm gameId={gameId} onCommentAdded={handleCommentAdded} />
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

const tagStyle = {
  display: "inline-block",
  backgroundColor: "#222",
  color: "#fff",
  padding: "4px 10px",
  marginRight: "6px",
  fontSize: "12px",
  borderRadius: "6px",
};
