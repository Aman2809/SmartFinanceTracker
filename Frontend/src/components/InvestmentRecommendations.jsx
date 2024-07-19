import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvestmentRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await axios.get('/api/investments');
      setRecommendations(response.data);
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Investment Recommendations</h2>
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index} className="border-b py-2">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;
