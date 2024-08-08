import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import bg from '../../img/bg.png';
import {
  createExpenseData,
  updateExpenseData,
  getExpenseCategories,
  getExpensesByUser,
  getTotalExpenseByUser,
  deleteExpense
} from '../../services/Expense-service';
import { getCurrentUser } from '../../jwtAuth/auth';
import { toast } from 'react-toastify';
import { food,edit, transportation, house, healthcare, entertainment, education, personalCare, investment, gifts, travel, shopping, utility, trash, other, comment, calender, plus, rupee } from '../../utils/Icon';

const Expense = () => {
  const style = {
    backgroundImage: `url(${bg})`,
  };

  const [expenseList, setExpenseList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [expenses, setExpenses] = useState({
    description: '',
    amount: '',
    date: '',
    category: ''
  });
  const [totalExpense, setTotalExpense] = useState(0);
  const [active, setActive] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [editMode, setEditMode] = useState(false); // To track edit mode
  const [currentExpenseId, setCurrentExpenseId] = useState(null); // To store the ID of the expense being edited

  useEffect(() => {
    getExpenseCategories()
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
      fetchExpenses(user.id, currentPage);
      fetchTotalExpense(user.id); // Fetch the total expense
    }
  }, [user, currentPage]);

  const fetchExpenses = (userId, page) => {
    getExpensesByUser(userId, page, 3)
      .then((data) => {
        console.log(`Fetched page ${page}:`, data);
        if (data && data.expenseContent) {
          setExpenseList(data.expenseContent); // Use expenseContent instead of content
          setTotalPages(data.totalPages || 1); // Ensure totalPages is set even if not present in response
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  const fetchTotalExpense = (userId) => {
    getTotalExpenseByUser(userId)
      .then((total) => {
        setTotalExpense(total); // Set the total expense fetched from the backend
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fieldChanged = (event, field) => {
    setExpenses({ ...expenses, [field]: event.target.value });
  };

  const createOrUpdateExpense = (event) => {
    event.preventDefault();
    if (!user) {
      alert("User not loaded");
      return;
    }
    expenses['userId'] = user.id;

    if (editMode) {
      // Update existing expense
      updateExpenseData({ ...expenses, expenseId: currentExpenseId })
        .then(() => {
          toast.success("Expense Updated !! ");
          resetForm();
          fetchExpenses(user.id, currentPage);
          fetchTotalExpense(user.id); // Refresh the total expense after updating an entry
        })
        .catch((error) => {
          toast.error("Error Occurred !! ");
          console.error("Update Expense Error:", error.response || error.message);
        });
    } else {
      // Create new expense
      createExpenseData(expenses)
        .then(data => {
          toast.success("Expense Created !! ");
          resetForm();
          fetchExpenses(user.id, currentPage);
          fetchTotalExpense(user.id); // Refresh the total expense after creating a new entry
        })
        .catch((error) => {
          toast.error("Error Occurred !! ");
          console.error("Create Expense Error:", error.response || error.message);
        });
    }
  };

  const deleteExpenseHandler = (expenseId) => {
    deleteExpense(expenseId)
      .then(() => {
        toast.success("Expense Deleted !!");
        fetchExpenses(user.id, currentPage);
        fetchTotalExpense(user.id); // Refresh the total expense after deleting an entry
      })
      .catch((error) => {
        toast.error("Error Occurred While Deleting !! ");
        console.error("Delete Expense Error:", error.response || error.message);
      });
  };

  const editExpenseHandler = (expense) => {
    // Convert the date to yyyy-mm-dd format if necessary
    const formattedDate = new Date(expense.date).toISOString().split('T')[0];
    
    setExpenses({
      description: expense.description,
      amount: expense.amount,
      date: formattedDate,
      category: expense.category
    });
    setCurrentExpenseId(expense.expenseId);
    setEditMode(true);
  };
  

  const resetForm = () => {
    setExpenses({
      description: '',
      amount: '',
      date: '',
      category: ''
    });
    setEditMode(false);
    setCurrentExpenseId(null);
  };

  const renderIcon = (category) => {
    switch (category) {
      case 'FOOD':
        return food;
      case 'TRANSPORTATION':
        return transportation;
      case 'HOUSING':
        return house;
      case 'UTILITIES':
        return utility;
      case 'HEALTHCARE':
        return healthcare;
      case 'ENTERTAINMENT':
        return entertainment;
      case 'EDUCATION':
        return education;
      case 'SHOPPING':
        return shopping;
      case 'PERSONAL_CARE':
        return personalCare;
      case 'INVESTMENTS':
        return investment;
      case 'TRAVEL':
        return travel;
      case 'GIFTS_DONATIONS':
        return gifts;
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
          <h2 className="text-3xl font-bold mb-1">Expenses</h2>
          <h2 className="total-expense flex justify-center items-center p-4 mt-2 mb-4 mx-0 bg-[#fcf6f9] border-2 border-white shadow-[0px_1px_15px_rgba(0,0,0,0.06)] rounded-[20px] text-2xl gap-2">
            Total Expense: <span className="text-2.5xl font-extrabold text-red-500">{rupee}{totalExpense}</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <form onSubmit={createOrUpdateExpense} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">
                    <input
                      type="text"
                      value={expenses.description}
                      onChange={(e) => fieldChanged(e, 'description')}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Expense description"
                    />
                  </label>
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    <input
                      type="number"
                      value={expenses.amount}
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
                      value={expenses.date}
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
                      value={expenses.category}
                      onChange={(e) => fieldChanged(e, 'category')}
                      required
                      className="mt-1 block w-2/3 border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Category"
                    >
                      <option value="">Select Category</option>
                      {categories && categories.length > 0 && categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type="submit" className="px-4 py-2 bg-pink-500 text-white text-sm rounded-3xl hover:bg-pink-600">
                  {plus} {editMode ? 'Update Expense' : 'Add Expense'}
                </button>
              </form>
            </div>
            <div className="w-full md:w-3/4">
              {expenseList.length > 0 ? (
                <ul className="space-y-3">
                  {expenseList.map((expense) => (
                    <li key={expense.expenseId} className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div style={{ backgroundColor: 'rgba(252, 246, 249, 0.78)' }} className="text-3xl border rounded-md p-2 mr-4">
                          {renderIcon(expense.category)}
                        </div>
                        <div className='flex flex-col'>
                          <h3 className="font-semibold text-lg ">{expense.category}</h3>
                          <div className='flex flex-row gap-2 mt-1'>
                            <span className="mr-2">{rupee} {expense.amount}</span>
                            <p className="text-sm">{calender} {Array.isArray(expense.date) ? expense.date.join('-') : expense.date}</p>
                            <p className="ml-2">{comment} {expense.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <button
                          onClick={() => editExpenseHandler(expense)}
                          className="bg-yellow-500 text-white rounded-full px-4 py-2 mr-2">
                          {edit}
                        </button>
                        <button
                          onClick={() => deleteExpenseHandler(expense.expenseId)}
                          className="bg-black text-white rounded-full px-4 py-2">
                          {trash}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No expenses found</p>
              )}

              <div className="flex justify-between items-center mt-4 space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">Page {currentPage + 1} of {totalPages}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 "
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

export default Expense;
