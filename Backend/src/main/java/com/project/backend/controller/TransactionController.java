package com.project.backend.controller;

import com.project.backend.payloads.GraphDataDto;
import com.project.backend.payloads.TotalResponse;
import com.project.backend.payloads.RecentHistoryResponse;
import com.project.backend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/user/{userId}/transactions/graph")
    public ResponseEntity<List<GraphDataDto>> getGraphData(
            @PathVariable Long userId,
            @RequestParam("startDate") LocalDate startDate,
            @RequestParam("endDate") LocalDate endDate) {
        List<GraphDataDto> graphData = transactionService.getGraphData(userId, startDate, endDate);
        return ResponseEntity.ok(graphData);
    }

    @GetMapping("/user/{userId}/transactions/total")
    public ResponseEntity<TotalResponse> getTotalIncomeAndExpenses(@PathVariable Long userId) {
        TotalResponse totalResponse = transactionService.getTotalIncomeAndExpenses(userId);
        return ResponseEntity.ok(totalResponse);
    }

    @GetMapping("/user/{userId}/transactions/recent")
    public ResponseEntity<RecentHistoryResponse> getRecentHistory(
            @PathVariable Long userId,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        RecentHistoryResponse recentHistory = transactionService.getRecentHistory(userId, limit);
        return ResponseEntity.ok(recentHistory);
    }
}
