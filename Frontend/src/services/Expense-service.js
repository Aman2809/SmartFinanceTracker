// src/services/ExpenseService.js
import { myAxios, privateAxios } from "./helper";

// Create Expense
export const createExpenseData = async (expenseData) => {
    try {
        const response = await privateAxios.post(`/user/${expenseData.userId}/expenses`, expenseData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in createExpenseData:", error.response || error.message);
        throw error;
    }
};

// Update Expense
export const updateExpenseData = async (expense) => {
    try {
      const response = await privateAxios.put(`/expenses/${expense.expenseId}`, expense);
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

// Get Expense By Id
export const getExpenseById = async (expenseId) => {
    try {
        const response = await myAxios.get(`/expenses/${expenseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Expenses By User
export const getExpensesByUser = async (userId, pageNumber = 0, pageSize = 3, sortBy = 'expenseId', sortDir = 'asc') => {
    try {
        const response = await myAxios.get(`/user/${userId}/expenses`, {
            params: { pageNumber, pageSize, sortBy, sortDir }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Expenses By User and Category
export const getExpensesByUserAndCategory = async (userId, category) => {
    try {
        const response = await myAxios.get(`/users/${userId}/expenses/category/${category}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Total Expense By User
export const getTotalExpenseByUser = async (userId) => {
    try {
        const response = await myAxios.get(`/user/${userId}/expenses/total`);
        return response.data;
    } catch (error) {
        console.error("Error in getTotalExpenseByUser:", error.response || error.message);
        throw error;
    }
};

// Get All Expenses
export const getAllExpenses = async (pageNumber = 0, pageSize = 3, sortBy = 'expenseId', sortDir = 'asc') => {
    try {
        const response = await myAxios.get(`/expenses`, {
            params: { pageNumber, pageSize, sortBy, sortDir }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Expenses By User and Date Between
export const getExpensesByUserAndDateBetween = async (userId, startDate, endDate) => {
    try {
        const response = await myAxios.get(`/user/${userId}/expenses/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete Expense
export const deleteExpense = async (expenseId) => {
    try {
        const response = await privateAxios.delete(`/expenses/${expenseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Get Expense Categories
export const getExpenseCategories = async () => {
    try {
        const response = await myAxios.get(`/expenses/categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
