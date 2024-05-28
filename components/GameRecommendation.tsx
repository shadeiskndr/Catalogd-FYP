// components/GameRecommendation.tsx
import React, { useState } from "react";

const GameRecommendation: React.FC = () => {
  const [preferences, setPreferences] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      setError("Failed to get recommendations");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Game Recommendations</h2>
      <textarea
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        placeholder="Enter your game preferences..."
      />
      <button onClick={handleGetRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>
      {error && <p>{error}</p>}
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameRecommendation;