import React, { useState } from "react";

const savedGames = [
  {
    id: 1,
    title: "God of War",
    cover:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
    trailer: "https://www.youtube.com/embed/K0u_kAWLJOA",
  },
  {
    id: 2,
    title: "Spider-Man: Miles Morales",
    cover:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/header.jpg",
    trailer: "https://www.youtube.com/embed/Uag2BA6xBMs",
  },
];

const freePSGames = [
  {
    id: "warzone",
    title: "Call of Duty: Warzone",
    cover:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1962663/header.jpg",
    link: "https://www.callofduty.com/warzone",
  },
  {
    id: "destiny2",
    title: "Destiny 2",
    cover:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg",
    link: "https://www.bungie.net/7/en/Destiny/NewLight",
  },
  {
    id: "apex",
    title: "Apex Legends",
    cover:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
    link: "https://www.ea.com/games/apex-legends",
  },
];

export default function Wishlist() {
  const [modalGame, setModalGame] = useState(null);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f111a, #1a1e2a)",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Your Wishlist ❤️
      </h1>
      <p style={{ marginBottom: "2rem", fontSize: "1.2rem", color: "#bbb" }}>
        These are the games you've saved. Play trailers & explore!
      </p>

      {/* Saved Wishlist Games */}
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {savedGames.map((game) => (
          <div
            key={game.id}
            style={{
              minWidth: "300px",
              borderRadius: "12px",
              background: "linear-gradient(145deg, #22252f, #1b1f29)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.8), inset 0 0 10px #151920",
              flexShrink: 0,
              cursor: "pointer",
            }}
            onClick={() => setModalGame(game)}
          >
            <img
              src={game.cover}
              alt={game.title}
              style={{
                width: "100%",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
              }}
            />
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h2>{game.title}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalGame(game);
                }}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "0.6rem",
                  backgroundColor: "#0070f3",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                ▶️ Play Trailer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Free PlayStation-Style Games */}
      <h2
        style={{
          marginTop: "3rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#00d8ff",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Free PlayStation-Style Games 🎮
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {freePSGames.map((game) => (
          <div
            key={game.id}
            style={{
              width: "280px",
              background: "linear-gradient(145deg, #22252f, #1b1f29)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,216,255,0.2)",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <img
              src={game.cover}
              alt={game.title}
              style={{ width: "100%", display: "block" }}
            />
            <div style={{ padding: "1rem" }}>
              <h3>{game.title}</h3>
              <a
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.6rem 1.2rem",
                  backgroundColor: "#1abc9c",
                  borderRadius: "6px",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                🎮 Play Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Trailer Modal for Saved Games */}
      {modalGame && (
        <div
          onClick={() => setModalGame(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "90vw",
              maxWidth: "960px",
              aspectRatio: "16 / 9",
              backgroundColor: "#000",
              borderRadius: "12px",
              boxShadow: "0 0 20px #0070f3",
              overflow: "hidden",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={modalGame.trailer + "?autoplay=1"}
              title={modalGame.title}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setModalGame(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
