"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Search } from "@/rawg/search";
import { Game } from "@/gameTypes";
import { database, databaseId, reviewCol, userID } from "@/utils/appwrite";
import { ID } from "appwrite";
import { toast } from "react-hot-toast";

type ReviewFormProps = {
  collection: string;
  gameId: number;
  gameName: string;
  gameReview: string;
  gameRating: number;
};

const TestMyLib = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  useEffect(() => {
    const fetchGames = async () => {
      if (searchTerm) {
        const response = await Search({ term: searchTerm });
        setSearchedGames(response.results);
      }
    };

    fetchGames();
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setSearchTerm("");
    setSearchedGames([]);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGame || rating < 1 || rating > 10 || !review) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const reviewData: ReviewFormProps = {
      collection: reviewCol,
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      gameReview: review,
      gameRating: rating,
    };

    try {
      const createPromise = database.createDocument(
        `${databaseId}`,
        `${reviewData.collection}`,
        ID.unique(),
        {
          user_id: userID,
          game_id: reviewData.gameId,
          game_name: reviewData.gameName,
          review: reviewData.gameReview,
          rating: reviewData.gameRating,
        }
      );

      const response = await createPromise;
      console.log("Review submitted successfully:", response);
      toast.success("Review submitted successfully!");
      setSelectedGame(null);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review.");
    }
  };

  return (
    <div className="p-6 bg-stone-950 text-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Review and Rate a Game</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a game..."
          className="w-full p-2 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {searchedGames.length > 0 && (
          <ul className="bg-gray-800 mt-2 rounded-md max-h-60 overflow-y-auto">
            {searchedGames.map((game) => (
              <li
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className="p-2 cursor-pointer hover:bg-gray-700"
              >
                {game.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedGame && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">{selectedGame.name}</h2>
          <div className="mb-4">
            <label className="block mb-1">Rating (1-10):</label>
            <input
              type="number"
              value={rating}
              onChange={handleRatingChange}
              min="1"
              max="10"
              required
              className="w-full p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Review:</label>
            <textarea
              value={review}
              onChange={handleReviewChange}
              required
              className="w-full p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default TestMyLib;