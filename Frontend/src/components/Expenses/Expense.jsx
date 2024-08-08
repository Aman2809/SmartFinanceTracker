import React, { useState } from 'react';
import axios from 'axios';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = async () => {
    const newExpense = { amount, description };
    const response = await axios.post('/api/expenses', newExpense);
    setExpenses([...expenses, response.data]);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddExpense}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
        <ul className="mt-4">
          {expenses.map((expense, index) => (
            <li key={index} className="border-b py-2">
              {expense.description}: ${expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expense;
