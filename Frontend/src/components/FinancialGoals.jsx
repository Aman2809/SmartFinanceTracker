import React, { useState } from 'react';
import axios from 'axios';

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState('');

  const handleAddGoal = async () => {
    const newGoal = { goal };
    const response = await axios.post('/api/goals', newGoal);
    setGoals([...goals, response.data]);
    setGoal('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Financial Goals</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddGoal}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Goal
        </button>
        <ul className="mt-4">
          {goals.map((goal, index) => (
            <li key={index} className="border-b py-2">
              {goal.goal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinancialGoals;
