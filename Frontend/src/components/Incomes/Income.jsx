import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import bg from '../../img/bg.png';
import {
    createIncomeData,
    getIncomeCategories,
    getIncomesByUser,
    getTotalIncomeByUser,
    updateIncome,
    deleteIncome,
    getIncomeById
} from '../../services/Income-service';
import { getCurrentUser } from '../../jwtAuth/auth';
import { toast } from 'react-toastify';
import { salary,edit, rental, business, investment, interest, trash, other, dollar, comment, calender,plus,rupee } from '../../utils/Icon';

const Income = () => {
    const style = {
        backgroundImage: `url(${bg})`,
    };

    const [incomeList, setIncomeList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [incomes, setIncomes] = useState({
        description: '',
        amount: '',
        date: '',
        category: ''
    });
    const [totalIncome, setTotalIncome] = useState(0);
    const [active, setActive] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [editingIncome, setEditingIncome] = useState(null);

    useEffect(() => {
        getIncomeCategories()
            .then((data) => {
                const categoriesObjects = data.map((name, index) => ({
                    id: index + 1,
                    name: name
                }));
                setCategories(categoriesObjects);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    useEffect(() => {
        if (user) {
            fetchIncomes(user.id, currentPage);
            fetchTotalIncome(user.id);
        }
    }, [user, currentPage]);

    const fetchIncomes = (userId, page) => {
        getIncomesByUser(userId, page, 3)
            .then((data) => {
                setIncomeList(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchTotalIncome = (userId) => {
        getTotalIncomeByUser(userId)
            .then((total) => {
                setTotalIncome(total);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fieldChanged = (event, field) => {
        setIncomes({ ...incomes, [field]: event.target.value });
    };

    const createOrUpdateIncome = (event) => {
        event.preventDefault();
        if (!user) {
            alert("User not loaded");
            return;
        }
        incomes['userId'] = user.id;
        if (editingIncome) {
            updateIncome(editingIncome.incomeId, incomes)
                .then(data => {
                    toast.success("Income Updated !!");
                    setEditingIncome(null);
                    setIncomes({
                        description: '',
                        amount: '',
                        date: '',
                        category: ''
                    });
                    fetchIncomes(user.id, currentPage);
                    fetchTotalIncome(user.id);
                })
                .catch(error => {
                    toast.error("Error Occurred !!");
                    console.error("Update Income Error:", error.response || error.message);
                });
        } else {
            createIncomeData(incomes)
                .then(data => {
                    toast.success("Income Created !!");
                    setIncomes({
                        description: '',
                        amount: '',
                        date: '',
                        category: ''
                    });
                    fetchIncomes(user.id, currentPage);
                    fetchTotalIncome(user.id);
                })
                .catch(error => {
                    toast.error("Error Occurred !!");
                    console.error("Create Income Error:", error.response || error.message);
                });
        }
    };

    const startEdit = (income) => {
        // Convert the date to yyyy-mm-dd format
        const formattedDate = new Date(income.date).toISOString().split('T')[0];
        
        setEditingIncome(income);
        setIncomes({
            description: income.description,
            amount: income.amount,
            date: formattedDate,
            category: income.category
        });
    };
    

    const deleteIncomeHandler = (incomeId) => {
        deleteIncome(incomeId)
            .then(() => {
                toast.success("Income Deleted !!");
                fetchIncomes(user.id, currentPage);
                fetchTotalIncome(user.id);
            })
            .catch((error) => {
                toast.error("Error Occurred While Deleting !! ");
                console.error("Delete Income Error:", error.response || error.message);
            });
    };

    const renderIcon = (category) => {
        switch (category) {
            case 'SALARY':
                return salary;
            case 'BUSINESS':
                return business;
            case 'INTEREST':
                return interest;
            case 'RENTAL':
                return rental;
            case 'INVESTMENT':
                return investment;
            default:
                return other;
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div style={style} className="flex">
            <Navigation active={active} setActive={setActive} />
            <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="flex-1 h-[94vh] rounded-2xl flex flex-col ml-2 mr-8 p-8 my-auto">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold mb-1">Incomes</h2>
                    <h2 className="total-income flex justify-center items-center p-4 mt-2 mb-4 mx-0 bg-[#fcf6f9] border-2 border-white shadow-[0px_1px_15px_rgba(0,0,0,0.06)] rounded-[20px] text-2xl gap-2">
                        Total Income: <span className="text-2.5xl font-extrabold text-green-500"> {rupee}{totalIncome}</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4">
                            <form onSubmit={createOrUpdateIncome} className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="text"
                                            value={incomes.description}
                                            onChange={(e) => fieldChanged(e, 'description')}
                                            required
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Income description"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="number"
                                            value={incomes.amount}
                                            onChange={(e) => fieldChanged(e, 'amount')}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Amount"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">
                                        <input
                                            type="date"
                                            value={incomes.date}
                                            onChange={(e) => fieldChanged(e, 'date')}
                                            required
                                            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Enter a date"
                                        />
                                    </label>
                                </div>
                                <div className="">
                                    <label className="block font-medium mb-1">
                                        <select
                                            value={incomes.category}
                                            onChange={(e) => fieldChanged(e, 'category')}
                                            required
                                            className="mt-1 block w-2/3 border border-gray-300 rounded-lg p-2"
                                            placeholder="Enter Category"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <button type="submit" className="px-4 py-2 bg-pink-500 text-white text-sm rounded-3xl hover:bg-pink-600">
                                    {plus} {editingIncome ? 'Update Income' : 'Add Income'}
                                </button>
                            </form>
                        </div>
                        <div className="w-full md:w-3/4">
                            {incomeList.length > 0 ? (
                                <ul className="space-y-3">
                                    {incomeList.map((income) => (
                                        <li key={income.incomeId} className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="text-3xl border rounded-md p-2 mr-4">
                                                    {renderIcon(income.category)}
                                                </div>
                                                <div className='flex flex-col'>
                                                    <h3 className="font-semibold text-lg ">{income.category}</h3>
                                                    <div className='flex flex-row gap-2 mt-1'>
                                                        <span className="mr-2">{rupee} {income.amount}</span>
                                                        <p className="text-sm">{calender} {income.date.join('-')}</p>
                                                        <p className="ml-2">{comment}</p>{income.description || 'No description provided.'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => startEdit(income)}
                                                    className="bg-yellow-500 text-white rounded-full px-4 py-2 mr-2">
                                                    {edit}
                                                </button>
                                                <button
                                                    onClick={() => deleteIncomeHandler(income.incomeId)}
                                                    className="bg-black text-white rounded-full px-4 py-2">
                                                    {trash}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No incomes to display.</p>
                            )}
                        </div>
                    </div>
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
    );
};

export default Income;
