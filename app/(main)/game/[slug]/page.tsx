"use client";
import Banner from "@/components/game/Banner";
import Info from "@/components/game/Info";
import ReviewCardSlug from "@/components/ReviewCardSlug";
import { Game } from "@/gameTypes";
import { gameDetails, gameScreenshots } from "@/rawg";
import { Screenshot } from "@/rawg/gameScreenshots";
import { database, databaseId, reviewCol } from "@/utils/appwrite";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { Query } from "appwrite";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

//game page

type GamePageProps = {
  params: {
    slug: string;
  };
};

interface Review {
  user_id: string;
  user_name: string;
  game_name: string;
  rating: number;
  review: string;
}

const GamePage = ({ params: { slug } }: GamePageProps) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [screenshots, setScreenshots] = useState<Screenshot | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  

  //function for getting game details
  useEffect(() => {
    const getGame = async () => {
      try {
        setGame(await gameDetails({ slug: slug }));
        setScreenshots(await gameScreenshots({ slug: slug }));
        setLoading(false);
      } catch (error) {
        console.error("Error loading game:", error);
      }
    };
    getGame();
  }, [slug]);

  //function for getting reviews
  useEffect(() => {
    const loadReviews = async () => {
      if (!game?.name) return; // Ensure game name is defined

      setLoadingReviews(true);
      try {
        const response = await database.listDocuments(
          databaseId,
          reviewCol,
          [Query.equal("game_name", game.name)]
        );
        const newReviews = response.documents.map((doc: any) => ({
          user_id: doc.user_id,
          user_name: doc.user_name,
          game_name: doc.game_name,
          rating: doc.rating,
          review: doc.review,
        }));
        setReviews(newReviews);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (game) {
      loadReviews();
    }
  }, [game]);

  return (
    <div>
      <div className="absolute inset-0 -z-50 opacity-20 blur-sm">
        <Image src={game?.background_image!} alt="bg" fill />
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
            <Info game={game} screenshots={screenshots?.results!} />
          ) : (
            <PacmanLoader
              className="flex mx-auto my-2"
              color="#ffa600"
              size={20}
              loading={loading}
            />
          )}
          {/* Reviews Section */}
          <div className="p-6 bg-indigo-100/10 my-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg md:text-xl lg:text-2xl text-gray-200 font-semibold">
                Reviews
              </h1>
              <Link href="/Write" className="flex items-center text-sm text-gray-200 hover:underline">
                <PencilIcon className="h-5 w-5 mr-1" />
                Add a Review
              </Link>
            </div>
            {loadingReviews ? (
              <PacmanLoader
                className="flex mx-auto my-2"
                color="#ffa600"
                size={20}
                loading={loadingReviews}
              />
            ) : reviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, index) => (
                  <ReviewCardSlug
                    key={index}
                    userName={review.user_name}
                    //gameName={review.game_name}
                    rating={review.rating}
                    reviewText={review.review}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews available for this game.</p>
            )}
          </div>
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
