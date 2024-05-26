import React from 'react';
import { FaStar, FaCommentDots } from 'react-icons/fa';

type ReviewCardProps = {
  userName: string;
  gameName: string;
  rating: number;
  reviewText: string;
};

const ReviewCard = ({ userName, gameName, rating, reviewText }: ReviewCardProps) => {
  const getRatingColor = (rating: number) => {
    if (rating === 10) return 'text-green-400';
    if (rating >= 7) return 'text-green-600';
    if (rating >= 4) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div
      className="block rounded-3xl h-max 
      hover:scale-105 transition-all duration-300 ease-in-out
      bg-gray-800 p-4"
    >
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-200">
          <h3 className="font-extrabold text-lg">{gameName}</h3>
          <p className="text-xs">{userName}</p>
        </div>
        <div className="flex items-center">
          <span className={`mr-1 ${getRatingColor(rating)}`}>{rating}</span>
          <FaStar className={getRatingColor(rating)} />
        </div>
      </div>
      <div className="mt-2 text-gray-300">
        <p>{reviewText}</p>
      </div>
      <div className="flex justify-end mt-2">
        <FaCommentDots className="text-gray-400" />
      </div>
    </div>
  );
};

export default ReviewCard;
