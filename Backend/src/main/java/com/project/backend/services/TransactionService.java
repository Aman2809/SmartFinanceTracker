package com.project.backend.services;


import java.time.LocalDate;
import java.util.List;

import com.project.backend.payloads.GraphDataDto;
import com.project.backend.payloads.RecentHistoryResponse;
import com.project.backend.payloads.TotalResponse;

public interface TransactionService {
	List<GraphDataDto> getGraphData(Long userId, LocalDate startDate, LocalDate endDate);
    TotalResponse getTotalIncomeAndExpenses(Long userId);
    RecentHistoryResponse getRecentHistory(Long userId, int limit);
}
