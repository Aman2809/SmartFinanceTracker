import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';
import bg from '../img/bg.png';
import {
    createFinancialGoal,
    getFinancialGoalsByUser,
    updateFinancialGoal,
    deleteFinancialGoal,
    getFinancialGoalById
} from '../services/FinancialGoals-service';  // Add this service file
import { getCurrentUser } from '../jwtAuth/auth';
import { toast } from 'react-toastify';

const FinancialGoals = () => {
    const style = {
        backgroundImage: `url(${bg})`,
    };

    const [goalsList, setGoalsList] = useState([]);
    const [user, setUser] = useState(undefined);
    const [goals, setGoals] = useState({
        name:'',
        description: '',
        targetAmount: '',
        currentAmount:'',
    });
    const [editingGoal, setEditingGoal] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (user) {
            fetchGoals(user.id, currentPage);
        }
    }, [user, currentPage]);

    const fetchGoals = (userId, page) => {
        getFinancialGoalsByUser(userId, page, 3)
            .then((data) => {
                setGoalsList(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fieldChanged = (event, field) => {
        setGoals({ ...goals, [field]: event.target.value });
    };

    const createOrUpdateGoal = (event) => {
        event.preventDefault();
        if (!user) {
            alert("User not loaded");
            return;
        }
        goals['userId'] = user.id;
        if (editingGoal) {
            updateFinancialGoal(editingGoal.goalId, goals)
                .then(data => {
                    toast.success("Goal Updated !!");
                    setEditingGoal(null);
                    setGoals({
                      name:'',
                      description: '',
                      targetAmount: '',
                      currentAmount:'',
                    });
                    fetchGoals(user.id, currentPage);
                })
                .catch(error => {
                    toast.error("Error Occurred !!");
                    console.error("Update Goal Error:", error.response || error.message);
                });
        } else {
            createFinancialGoal(goals)
                .then(data => {
                    toast.success("Goal Created !!");
                    setGoals({
                        description: '',
                        targetAmount: '',
                        deadline: '',
                        priority: '',
                    });
                    fetchGoals(user.id, currentPage);
                })
                .catch(error => {
                    toast.error("Error Occurred !!");
                    console.error("Create Goal Error:", error.response || error.message);
                });
        }
    };

    const startEdit = (goal) => {

        setEditingGoal(goal);
        setGoals({
            name :goal.name,
            description: goal.description,
            targetAmount: goal.targetAmount,
            currentAmount:goal.currentAmount,
        });
    };

    const deleteGoalHandler = (goalId) => {
        deleteFinancialGoal(goalId)
            .then(() => {
                toast.success("Goal Deleted !!");
                fetchGoals(user.id, currentPage);
            })
            .catch((error) => {
                toast.error("Error Occurred While Deleting !! ");
                console.error("Delete Goal Error:", error.response || error.message);
            });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div style={style} className="flex">
            <Navigation active={2} setActive={() => {}} />  {/* Adjust navigation */}
            <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="flex-1 h-[94vh] rounded-2xl flex flex-col ml-2 mr-8 p-8 my-auto">
                <div className="flex flex-col">
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
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Current Amount"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">Save Goal</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-3/4">
                            <h3 className="text-xl font-semibold mb-4">Goals List</h3>
                            <div className="space-y-4">
                                {goalsList.map((goal) => (
                                    <div key={goal.goalId} className="p-4 bg-white rounded-lg shadow-md">
                                        <h4 className="text-lg font-bold">{goal.name}</h4>
                                        <p>Target: {goal.description}</p>
                                        <p>Target: {goal.targetAmount}</p>
                                        <p>Target: {goal.currentAmount}</p>
                                        
                                        <div className="flex gap-4 mt-2">
                                            <button onClick={() => startEdit(goal)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                                            <button onClick={() => deleteGoalHandler(goal.goalId)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialGoals;
