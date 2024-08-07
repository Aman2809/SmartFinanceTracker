// src/services/IncomeService.js
import { myAxios ,privateAxios} from "./helper";


// Create Income
// export const createIncome = async (userId, incomeDto) => {
//     try {
//         const response = await myAxios.post(`/user/${userId}/incomes`, incomeDto);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };



// export const createIncomeData = async (incomeData) => {
//     try {
//         console.log(incomeData)
//         const response = await privateAxios.post(`/user/${incomeData.userId}/incomes`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };


// Create Income
export const createIncomeData = async (incomeData) => {
    try {
        console.log(incomeData);
        const response = await privateAxios.post(`/user/${incomeData.userId}/incomes`, incomeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in createIncomeData:", error.response || error.message);
        throw error;
    }
};

// Update Income
export const updateIncome = async (incomeId, incomeDto) => {
    try {
        const response = await myAxios.put(`/incomes/${incomeId}`, incomeDto);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Income By Id
export const getIncomeById = async (incomeId) => {
    try {
        const response = await myAxios.get(`/incomes/${incomeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Incomes By User
export const getIncomesByUser = async (userId, pageNumber = 0, pageSize = 10, sortBy = 'id', sortDir = 'asc') => {
    try {
        const response = await myAxios.get(`/user/${userId}/incomes`, {
            params: { pageNumber, pageSize, sortBy, sortDir }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Incomes By User and Category
export const getIncomesByUserAndCategory = async (userId, category) => {
    try {
        const response = await myAxios.get(`/users/${userId}/incomes/category/${category}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get All Incomes
export const getAllIncomes = async () => {
    try {
        const response = await myAxios.get(`/incomes`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Incomes By User and Date Between
export const getIncomesByUserAndDateBetween = async (userId, startDate, endDate) => {
    try {
        const response = await myAxios.get(`/user/${userId}/incomes/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete Income
export const deleteIncome = async (incomeId) => {
    try {
        const response = await myAxios.delete(`/incomes/${incomeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Income Categories
export const getIncomeCategories = async () => {
    try {
        const response = await myAxios.get(`/incomes/categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

