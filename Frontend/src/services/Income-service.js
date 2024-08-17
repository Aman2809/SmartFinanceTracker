// src/services/Income-service.js
import { myAxios ,privateAxios} from "./helper";



//Text-to-form Fillup
export const FormFillup = async (text)=>{
    try {
        const response = await privateAxios.post('/predict/transaction', {
                text: text
            });
            return response.data;
    }catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to parse the text input.');
    }
};




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

// src/services/IncomeService.js
export const updateIncome = async (incomeId, incomeDto) => {
    try {
        const response = await privateAxios.put(`/incomes/${incomeId}`, incomeDto);
        return response.data;
    } catch (error) {
        console.error("Error in updateIncome:", error.response || error.message);
        throw error;
    }
};

// Get Income By Id (for pre-filling the form)
export const getIncomeById = async (incomeId) => {
    try {
        const response = await privateAxios.get(`/incomes/${incomeId}`);
        return response.data;
    } catch (error) {
        console.error("Error in getIncomeById:", error.response || error.message);
        throw error;
    }
};

// Get Incomes By User
export const getIncomesByUser = async (userId, pageNumber = 0, pageSize = 3, sortBy = 'incomeId', sortDir = 'asc') => {
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

// Get Total Income By User
export const getTotalIncomeByUser = async (userId) => {
    try {
        const response = await myAxios.get(`/user/${userId}/incomes/total`);
        return response.data;
    } catch (error) {
        console.error("Error in getTotalIncomeByUser:", error.response || error.message);
        throw error;
    }
};


// Get All Incomes
export const getAllIncomes = async (pageNumber = 0, pageSize = 3, sortBy = 'incomeId', sortDir = 'asc') => {
    try {
        const response = await myAxios.get(`/incomes`,{
            params: { pageNumber, pageSize, sortBy, sortDir }
        });
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
        const response = await privateAxios.delete(`/incomes/${incomeId}`);
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

