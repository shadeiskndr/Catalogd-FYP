"use client";
import Banner from "@/components/game/Banner";
import Info from "@/components/game/Info";
import { Game } from "@/gameTypes";
import { gameDetails, gameScreenshots } from "@/rawg";
import { Screenshot } from "@/rawg/gameScreenshots";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
//game page

type GamePageProps = {
  params: {
    slug: string;
  };
};

const GamePage = ({ params: { slug } }: GamePageProps) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [screenshots, setScreenshots] = useState<Screenshot | null>(null);
  //function for getting game details
  useEffect(() => {
    const getGame = async () => {
      try {
        setGame(await gameDetails({ slug: slug }));
        setScreenshots(await gameScreenshots({ slug: slug }))
        setLoading(false);
      } catch (error) {
        console.error("Error loading game:", error);
      }
    };
    getGame();
  }, [slug]);

  return (
    <div>
      <div className="absolute inset-0 -z-50
      opacity-20 blur-sm">
        <Image
        src={game?.background_image!}
        alt="bg"
        fill
         />
      </div>
      {game ? (
        <div>
          <Banner
            bannerImg={game.background_image}
            gameName={game.name}
            gameRating={game.metacritic}
            gameReleaseDate={game.released}
            gameGenres={game.genres}
            gameId={game.id}
          />
          {screenshots?.results ? (
          <Info 
          game = {game}
          screenshots = {screenshots?.results!}
           />
          ) : (
            <PacmanLoader
            className="flex mx-auto my-2"
            color="#ffa600"
            size={20}
            loading={loading}
          />
          )}
        </div>
      ) : (
        <PacmanLoader
          className="flex mx-auto my-2"
          color="#ffa600"
          size={20}
          loading={loading}
        />
      )}
    </div>
  );
};

export default GamePage;
