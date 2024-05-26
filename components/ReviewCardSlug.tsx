import React from 'react';

type ReviewCardProps = {
  userName: string;
  rating: number;
  reviewText: string;
};

const ReviewCardSlug = ({ userName, rating, reviewText }: ReviewCardProps) => {
  const getRatingColor = (rating: number) => {
    if (rating === 10) return 'text-green-400';
    if (rating >= 7) return 'text-green-600';
    if (rating >= 4) return 'text-yellow-400';
    return 'text-red-500';
  };

  const getReviewTitle = (rating: number) => {
    if (rating === 10) return 'Recommended, amazing! 😍';
    if (rating >= 7) return 'Satisfied, good game. 😊';
    if (rating >= 4) return 'Fine, an okay game. 😐';
    return 'Avoid, terrible game. 😞';
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold text-white">{getReviewTitle(rating)}</h2>
        <p className="text-gray-400">{userName}</p>
        <p className="text-gray-300 mt-2">{reviewText}</p>
      </div>
      <div className={`text-xl font-bold ${getRatingColor(rating)}`}>
        {rating} <span className="mr-1">⭐</span>
      </div>
    </div>
  );
};

export default ReviewCardSlug;
