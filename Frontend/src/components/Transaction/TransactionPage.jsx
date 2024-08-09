import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Navigation from '../Navigation/Navigation';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        fetchTransactions();
        fetchTotals();
    }, []);

    const fetchTransactions = async () => {
        const sampleTransactions = [
            { id: 1, date: '2024-01-01', description: 'Salary', amount: 5000, type: 'Income' },
            { id: 2, date: '2024-01-05', description: 'Groceries', amount: -200, type: 'Expense' },
        ];
        setTransactions(sampleTransactions);
    };

    const fetchTotals = async () => {
        setTotalIncome(5000);
        setTotalExpense(200);
        setTotalBalance(4800);
    };

    return (
        <div className="flex">
            <Navigation />
            <div className="flex-1 h-[94vh] bg-[rgba(252,246,249,0.78)] rounded-2xl flex flex-col ml-2 mr-8 p-8 my-auto">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold mb-2">Transactions</h2>
                    <div className="flex space-x-4 mb-8">
                        <div className="w-[63%]  bg-white p-6 rounded-2xl shadow-md">
                            <Bar
                                data={{
                                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                                    datasets: [
                                        {
                                            label: 'Income',
                                            data: [5000, 4000, 3000, 7000, 6000, 8000, 9000],
                                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                            borderColor: 'rgba(75, 192, 192, 1)',
                                            borderWidth: 1,
                                        },
                                        {
                                            label: 'Expense',
                                            data: [2000, 1500, 1000, 3000, 2500, 2000, 2300],
                                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                            borderColor: 'rgba(255, 99, 132, 1)',
                                            borderWidth: 1,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-4 w-[25%]">
                        <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
                        <ul className="space-y-4">
                            {transactions.map((transaction) => (
                                <li key={transaction.id} className="flex justify-between items-center">
                                    <div className="text-lg">
                                        <p>{transaction.description}</p>
                                        <span className="text-sm text-gray-500">{transaction.date}</span>
                                    </div>
                                    <p className={`text-lg ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        ₹{transaction.amount}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                        
                    </div>
                    <div className="w-3/5 flex flex-col justify-between ml-8">
                            <div className="flex mb-8">
                                <div className="w-1/2 bg-white p-6 rounded-2xl shadow-md mr-4">
                                    <h3 className="text-lg font-semibold mb-2">Total Income</h3>
                                    <p className="text-2xl font-bold text-green-500">₹{totalIncome}</p>
                                </div>
                                <div className="w-1/2 bg-white p-6 rounded-2xl shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">Total Expense</h3>
                                    <p className="text-2xl font-bold text-red-500">₹{totalExpense}</p>
                                </div>
                            </div>
                            <div className="bg-white w-1/2 p-6 rounded-2xl shadow-md -mt-4 mx-auto">
                                <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
                                <p className="text-2xl font-bold text-blue-500">₹{totalBalance}</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Transaction;
