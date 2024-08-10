import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import bg from '../../img/bg.png';

import Navigation from '../Navigation/Navigation';
import TransactionService from '../../services/Transaction-service';
import { getCurrentUser } from '../../jwtAuth/auth';

const TransactionPage = () => {

    const style = {
        backgroundImage: `url(${bg})`,
    };


    const [graphData, setGraphData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (user) {
            fetchGraphData();
            fetchTotals();
            fetchRecentTransactions();
        }
    }, [user]);

    const fetchGraphData = async () => {
        try {
            const userId = user.id;
            const startDate = '2024-01-01';
            const endDate = '2025-07-01';
            const response = await TransactionService.getGraphData(userId, startDate, endDate);
            setGraphData(response.data);
        } catch (error) {
            console.error('Error fetching graph data:', error);
        }
    };

    const fetchTotals = async () => {
        try {
            const userId = user.id;
            const response = await TransactionService.getTotalIncomeAndExpenses(userId);
            setTotalIncome(response.data.totalIncome);
            setTotalExpense(response.data.totalExpense);
            setTotalBalance(response.data.totalBalance);
        } catch (error) {
            console.error('Error fetching total income and expenses:', error);
        }
    };

    const fetchRecentTransactions = async () => {
        try {
            const userId = user.id;
            const response = await TransactionService.getRecentHistory(userId);
            console.log('Full Transaction Data:', response.data.recentTransactions);
            setTransactions(response.data.recentTransactions.slice(0, 3) || []);
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
            setTransactions([]);
        }
    };
    
    

    const generateGraph = () => {
        if (!graphData || graphData.length === 0) {
            return <p>No graph data available.</p>;
        }

        return (
            <div className="w-full bg-white p-6 rounded-2xl shadow-md h-full"> {/* Set a fixed height for the graph */}
                <Bar
                    data={{
                        labels: graphData.map(item => item.date),
                        datasets: [
                            {
                                label: 'Income',
                                data: graphData.map(item => item.totalIncome),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Expense',
                                data: graphData.map(item => item.totalExpense),
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
        );
    };

    return (
        <div style={style} className="flex">
            <Navigation />
            <div className="flex-1 h-[94vh] bg-[rgba(252,246,249,0.78)] rounded-2xl flex flex-col ml-2 mr-8 p-8 my-auto">
                <h2 className="text-3xl font-bold mb-2">All Transactions</h2>
                <div className="flex flex-row space-x-4 mb-1">
                    {/* Left Side: Graph and Totals */}
                    <div className="flex flex-col w-[63%] space-y-4">
                        {/* Graph Section */}
                        <div className="bg-white p-6 rounded-2xl shadow-md h-[60%]">
                            {generateGraph()}
                        </div>
                        {/* Totals Section */}
                        <div className=" p-6 rounded-2xl flex flex-col space-y-4 h-[40%]">
                            <div className="flex space-x-4 h-1/2">
                                <div className="w-1/2 flex flex-col shadow-md justify-center items-center bg-white rounded-2xl">
                                    <h3 className="text-lg font-semibold mb-2 text-center">Total Income</h3>
                                    <p className="text-2xl font-bold text-green-500 text-center">₹{totalIncome}</p>
                                </div>
                                <div className="w-1/2 flex flex-col shadow-md justify-center items-center bg-white rounded-2xl">
                                    <h3 className="text-lg font-semibold mb-2 text-center">Total Expense</h3>
                                    <p className="text-2xl font-bold text-red-500 text-center">₹{totalExpense}</p>
                                </div>
                            </div>
                            <div className="flex flex-col shadow-md justify-center items-center bg-white rounded-2xl h-1/2">
                                <h3 className="text-lg font-semibold mb-2 text-center">Total Balance</h3>
                                <p className="text-2xl font-bold text-blue-500 text-center">₹{totalBalance}</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Side: Recent Transactions and Financial Goals */}
                    <div className="flex flex-col w-[37%]">
                        {/* Recent Transactions */}
                        <div className=" p-6 rounded-2xl flex flex-col space-y-1 h-[60%]">
                            <h3 className="text-2xl font-bold mb-2">Recent Transactions</h3>
                            <ul className="space-y-4">
                                {transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <li
                                            key={`${transaction.description}-${transaction.date}-${index}`}
                                           className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between"
                                        >
                                            <div className="text-lg">
                                                <p>{transaction.description}</p>
                                                {/* <span className="text-sm text-gray-500">{transaction.date}</span> */}
                                            </div>
                                            <p className={`text-lg ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>

                                                ₹{transaction.amount}
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <p>No recent transactions available.</p>
                                )}
                            </ul>

                        </div>
                        {/* Financial Goals Section */}
                        <div className=" p-6 rounded-2xl h-[40%]">
                            <h3 className="text-xl font-bold mb-2">Financial Goals</h3>
                            {/* Add your financial goals content here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



};

export default TransactionPage;
