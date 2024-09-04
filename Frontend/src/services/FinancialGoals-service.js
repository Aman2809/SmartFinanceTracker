// src/services/FinancialGoals-service.js
import { myAxios, privateAxios } from './helper';

// Create Financial Goal
export const createFinancialGoal = async (goalData) => {
    try {
        const response = await privateAxios.post(`/user/${goalData.userId}/financial-goals`, goalData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in createFinancialGoal:", error.response || error.message);
        throw error;
    }
};

// Update Financial Goal
export const updateFinancialGoal = async (goalsId, goalDto) => {
    try {
        const response = await privateAxios.put(`/financial-goals/${goalsId}`, goalDto);
        return response.data;
    } catch (error) {
        console.error("Error in updateFinancialGoal:", error.response || error.message);
        throw error;
    }
};

// Get Financial Goal By ID
export const getFinancialGoalById = async (goalsId) => {
    try {
        const response = await privateAxios.get(`/financial-goals/${goalsId}`);
        return response.data;
    } catch (error) {
        console.error("Error in getFinancialGoalById:", error.response || error.message);
        throw error;
    }
};

// Get Financial Goals By User
export const getFinancialGoalsByUser = async (userId, pageNumber = 0, pageSize = 5, sortBy = 'goalsId', sortDir = 'asc') => {
    try {
        const response = await privateAxios.get(`/user/${userId}/financial-goals`, {
            params: { pageNumber, pageSize, sortBy, sortDir }
        });
        return response.data;
    } catch (error) {
        console.error("Error in getFinancialGoalsByUser:", error.response || error.message);
        throw error;
    }
};

// Delete Financial Goal
export const deleteFinancialGoal = async (goalsId) => {
    try {
        const response = await privateAxios.delete(`/financial-goals/${goalsId}`);
        return response.data;
    } catch (error) {
        console.error("Error in deleteFinancialGoal:", error.response || error.message);
        throw error;
    }
};

// Search Financial Goals by Keywords
export const searchFinancialGoals = async (keywords) => {
    try {
        const response = await privateAxios.get(`/financial-goals/search`, {
            params: { keywords }
        });
        return response.data;
    } catch (error) {
        console.error("Error in searchFinancialGoals:", error.response || error.message);
        throw error;
    }
};
