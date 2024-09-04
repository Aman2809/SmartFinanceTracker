import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';
import bg from '../img/bg.png';
import { salary, edit, rental, business, investment, interest, trash, other, dollar, comment, calender, plus, rupee, freelance, pension, royalties, capital_gains, dividends, bonuses, commisions, child_support, alimony, social_security, annuities, lottery, grants, inheritence } from '../utils/Icon';
import {
    createFinancialGoal,
    getFinancialGoalsByUser,
    updateFinancialGoal,
    deleteFinancialGoal,
} from '../services/FinancialGoals-service'; // Service file
import { getCurrentUser } from '../jwtAuth/auth';
import { toast } from 'react-toastify';

const FinancialGoals = () => {
    const style = {
        backgroundImage: `url(${bg})`,
    };

    // States for goals list, user, current goal input, editing state, and pagination
    const [goalsList, setGoalsList] = useState([]);
    const [user, setUser] = useState(undefined);
    const [goals, setGoals] = useState({
        name: '',
        description: '',
        targetAmount: '',
        currentAmount: '',
    });
    const [editingGoal, setEditingGoal] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Load the current user on initial render
    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    // Fetch financial goals whenever user or page changes
    useEffect(() => {
        if (user) {
            fetchGoals(user.id, currentPage);
        }
    }, [user, currentPage]);

    // Fetch financial goals by user and page
    const fetchGoals = (userId, page) => {
        getFinancialGoalsByUser(userId, page, 3)
            .then((data) => {
                console.log(data);
                // Update to use goalsContent
                setGoalsList(data.goalsContent || []);
                setTotalPages(data.totalPages || 1);
            })
            .catch((error) => {
                console.error('Error fetching goals:', error);
                toast.error('Error fetching financial goals.');
            });
    };


    // Handle input change for form fields
    const fieldChanged = (event, field) => {
        setGoals({ ...goals, [field]: event.target.value });
    };

    // Handle form submission for creating or updating a goal
    const createOrUpdateGoal = (event) => {
        event.preventDefault();
        if (!user) {
            toast.error('User not loaded.');
            return;
        }
        goals['userId'] = user.id;

        if (editingGoal) {
            // Update an existing goal
            updateFinancialGoal(editingGoal.goalsId, goals)
                .then(() => {
                    toast.success('Goal updated successfully!');
                    resetForm();
                    fetchGoals(user.id, currentPage);
                })
                .catch(error => {
                    toast.error('Error updating goal.');
                    console.error('Update Goal Error:', error.response || error.message);
                });
        } else {
            // Create a new goal
            createFinancialGoal(goals)
                .then(() => {
                    toast.success('Goal created successfully!');
                    resetForm();
                    fetchGoals(user.id, currentPage);
                })
                .catch(error => {
                    toast.error('Error creating goal.');
                    console.error('Create Goal Error:', error.response || error.message);
                });
        }
    };

    // Reset form after creating or updating a goal
    const resetForm = () => {
        setGoals({
            name: '',
            description: '',
            targetAmount: '',
            currentAmount: '',
        });
        setEditingGoal(null);
    };

    // Start editing an existing goal
    const startEdit = (goal) => {
        setEditingGoal(goal);
        setGoals({
            name: goal.name,
            description: goal.description,
            targetAmount: goal.targetAmount,
            currentAmount: goal.currentAmount,
        });
    };

    // Delete a financial goal
    const deleteGoalHandler = (goalsId) => {
        deleteFinancialGoal(goalsId)
            .then(() => {
                toast.success('Goal deleted successfully!');
                fetchGoals(user.id, currentPage);
            })
            .catch((error) => {
                toast.error('Error occurred while deleting the goal.');
                console.error('Delete Goal Error:', error.response || error.message);
            });
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div style={style} className="flex">
            <Navigation active={2} setActive={() => { }} />
            <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="flex-1 h-[94vh] rounded-2xl flex flex-col ml-2 mr-8 p-8 my-auto">
                <div className="flex space-y-20 flex-col">
                    <h2 className="text-3xl font-bold mb-1">Financial Goals</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4">
                            <form onSubmit={createOrUpdateGoal} className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="text"
                                            value={goals.name}
                                            onChange={(e) => fieldChanged(e, 'name')}
                                            required
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Goal name"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="text"
                                            value={goals.description}
                                            onChange={(e) => fieldChanged(e, 'description')}
                                            required
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Goal description"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="number"
                                            value={goals.targetAmount}
                                            onChange={(e) => fieldChanged(e, 'targetAmount')}
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Target Amount"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="number"
                                            value={goals.currentAmount}
                                            onChange={(e) => fieldChanged(e, 'currentAmount')}
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Current Amount"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                                        {editingGoal ? 'Update Goal' : 'Save Goal'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-3/4">
                            <h3 className="text-xl font-semibold mb-4">Goals List</h3>
                            <div className="space-y-4">
                                {goalsList.length > 0 ? (
                                    <ul className="space-y-3">
                                        {goalsList.map((goal) => (
                                            <li key={goal.goalsId} className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="text-3xl border rounded-md p-2 mr-4">
                                                        {/* {renderIcon(income.category)} */}
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <h3 className="font-semibold text-lg ">{goal.name}</h3>
                                                        <div className='flex flex-row gap-2 mt-1'>
                                                            <span className="mr-2">{rupee} {goal.targetAmount}</span>
                                                            <p className="ml-2">{comment}</p>{goal.description || 'No description provided.'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => startEdit(goal)}
                                                        className="bg-yellow-500 text-white rounded-full px-4 py-2 mr-2">
                                                        {edit}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteGoalHandler(goal.goalsId)}
                                                        className="bg-black text-white rounded-full px-4 py-2">
                                                        {trash}
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No financial goals to display.</p>
                                )}
                            </div>
                            <div className="flex justify-center items-center mt-4 space-x-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>

                                <span className="px-4 py-2 text-gray-700">
                                    Page {currentPage + 1} of {totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialGoals;
