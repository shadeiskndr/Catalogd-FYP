import React from 'react';

const AIRecommender = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-gray-300 text-3xl font-bold">AI Recommender</h1>
      <div className="iframe-container">
        <iframe
          src="https://ai-game-recommender.netlify.app" // Replace with the URL of the website you want to embed
          width="100%"
          height="1050px"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AIRecommender;