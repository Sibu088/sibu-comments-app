import React from "react";
import GameCard from "../components/GameCard";

// Import game images
import game1 from "../assets/images/tomato.jpg";
import game2 from "../assets/images/Spinach.jpg";
import game3 from "../assets/images/pie.jpg";

// Import game videos
import video1 from "../assets/videos/gtaV.mp4";
import video2 from "../assets/videos/mysticlegends.mp4";
import video3 from "../assets/videos/Ufc.mp4";

export default function Home() {
  const games = [
    {
      id: "gta5",
      title: "GTA:V",
      description: "Grand Theft Auto V.",
      image: game1,
      video: video1,
    },
    {
      id: "mystic-legends",
      title: "Mystic Legends",
      description: "Forge your path as a wizard in the magical realm.",
      image: game2,
      video: video2,
    },
    {
      id: "Ufc-fight-night",
      title: "UFC Fight Night",
      description: "Experience the thrill of the octagon.",
      image: game3,
      video: video3,
    },
  ];

  return (
    <div className="game-grid" style={{ display: "grid", gap: "2rem", padding: "2rem" }}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          gameId={game.id}
          title={game.title}
          description={game.description}
          image={game.image}
          video={game.video}
        />
      ))}
    </div>
  );
}
