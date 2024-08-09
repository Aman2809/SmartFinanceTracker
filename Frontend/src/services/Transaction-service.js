import { privateAxios } from "./helper";

const TransactionService = {
  getGraphData: (userId, startDate, endDate) => {
    return privateAxios.get(`/user/${userId}/transactions/graph`, {
      params: { startDate, endDate },
    });
  },
  
  getTotalIncomeAndExpenses: (userId) => {
    return privateAxios.get(`/user/${userId}/transactions/total`);
  },
  
  getRecentHistory: (userId, limit = 10) => {
    return privateAxios.get(`/user/${userId}/transactions/recent`, {
      params: { limit },
    });
  },
};

export default TransactionService;
