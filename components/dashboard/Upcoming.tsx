"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { Game } from "@/gameTypes";
import { gameList } from "@/rawg";
import { PacmanLoader } from "react-spinners";
//for getting upcoming games
const Upcoming = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const response = await gameList({
        pageSize: 8,
        pageIndex: 1,
        page: 1,
        ordering: "-released",
      });
      let { results } = response;

      //  results = results.filter((game) => game.ratings_count > 10);
      //results.forEach((game) => (game.price = getPrice(game)));
      return results;
    };
    //setting games to the results of loadGames
    (async () => {
      try {
        setGames(await loadGames());
        setLoading(false);
      } catch (error) {
        console.error("Error loading games:", error);
      }
    })();
  }, []); //fixed request loop due to games dependency

  return (
    <div className="">
      <h1 className="text-gray-100 text-xl md:text-3xl font-bold">
        New and Upcoming
      </h1>
      {games ? (
        games.length ? (
          <Carousel games={games} />
        ) : (
          <p className="text-gray-100">No games found</p>
        )
      ) : (
        <div className="flex justify-center items-center">
          <PacmanLoader color="#ffa600" size={20} loading={true} />
        </div>
      )}
    </div>
  );
};

export default Upcoming;
