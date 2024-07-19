import React from 'react';
import { Link } from 'react-router-dom';

const dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="w-full max-w-sm space-y-4">
        <Link to="/expenses" className="block w-full bg-green-500 text-white py-3 rounded text-center hover:bg-green-600">
          Track Expenses
        </Link>
        <Link to="/goals" className="block w-full bg-blue-500 text-white py-3 rounded text-center hover:bg-blue-600">
          Set Financial Goals
        </Link>
        <Link to="/recommendations" className="block w-full bg-purple-500 text-white py-3 rounded text-center hover:bg-purple-600">
          Investment Recommendations
        </Link>
      </div>
    </div>
  );
};

export default dashboard;
