import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';
import bg from '../img/bg.png';
import { Menu } from 'lucide-react';

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
    const [isNavOpen, setIsNavOpen] = useState(false);
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

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden fixed top-0 left-0 p-4 z-50">
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="text-gray-500 bg-white rounded-full p-2 shadow-md"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Sliding Navigation for mobile */}
            <div
                className={`fixed inset-y-0 left-0 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition duration-200 ease-in-out z-30 md:relative md:flex`}
            >
                <div className=" bg-gray-100 h-full w-64 shadow-lg overflow-x-hidden overflow-y-auto md:hidden">
                    <Navigation active={2} setActive={() => { }} />


                </div>
            </div>

            {/* Desktop Table View */}
            <style>
                {`
            @media (min-width: 768px) {
              .desktop-table {
                display: block !important;
              }
            }
            @media (max-width: 767px) {
              .desktop-table {
                display: none !important;
              }
            }
          `}
            </style>


            <div className='desktop-table'>
                <Navigation active={2} setActive={() => { }} />

            </div>

            <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="flex-1 min-h-[94vh] rounded-2xl flex flex-col mx-2 md:ml-2 md:mr-8 p-4 md:p-8 my-auto">
    <div className="flex flex-col space-y-8 md:space-y-20">
        <h2 className="text-2xl md:text-3xl md:text-left text-center font-bold mb-1">Financial Goals</h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="w-full md:w-1/4">
                <form onSubmit={createOrUpdateGoal} className="space-y-3 md:space-y-4">
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
                                className="w-full border border-gray-300 rounded-lg p-2"
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
                                className="w-full border border-gray-300 rounded-lg p-2"
                                placeholder="Current Amount"
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                            {editingGoal ? 'Update Goal' : 'Save Goal'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full md:w-3/4">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Goals List</h3>
                <div className="space-y-4">
                    {goalsList.length > 0 ? (
                        <ul className="space-y-3">
                            {goalsList.map((goal) => (
                                <li key={goal.goalsId} className="bg-white rounded-2xl shadow-md p-3 md:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex items-start sm:items-center gap-3">
                                            <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="text-2xl md:text-3xl border rounded-md p-2">
                                                {/* {renderIcon(income.category)} */}
                                            </div>
                                            <div className='flex flex-col'>
                                                <h3 className="font-semibold text-base md:text-lg">{goal.name}</h3>
                                                <div className='flex flex-col sm:flex-row gap-2 mt-1'>
                                                    <span className="mr-2">{rupee} {goal.targetAmount}</span>
                                                    <p className="text-sm"><span className="mr-1">{comment}</span>{goal.description || 'No description provided.'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => startEdit(goal)}
                                                className="bg-yellow-500 text-white rounded-full px-3 md:px-4 py-2">
                                                {edit}
                                            </button>
                                            <button
                                                onClick={() => deleteGoalHandler(goal.goalsId)}
                                                className="bg-black text-white rounded-full px-3 md:px-4 py-2">
                                                {trash}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No financial goals to display.</p>
                    )}
                </div>
                <div className="flex justify-center items-center mt-4 space-x-2 md:space-x-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 md:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>

                    <span className="px-3 md:px-4 py-2 text-gray-700 text-sm md:text-base">
                        Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 md:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
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
