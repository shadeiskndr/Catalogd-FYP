import React from 'react';

type ReviewCardProps = {
  userName: string;
  gameName: string;
  rating: number;
  reviewText: string;
};

const ReviewCard = ({ userName, gameName, rating, reviewText }: ReviewCardProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white">{gameName}</h2>
      <p className="text-gray-400">Reviewed by: {userName}</p>
      <p className="text-yellow-400">Rating: {rating}/10</p>
      <p className="text-gray-300 mt-2">{reviewText}</p>
    </div>
  );
};

export default ReviewCard;