package com.project.backend.services.impl;


import com.project.backend.model.Expense;
import com.project.backend.model.FinancialGoals;
import com.project.backend.model.Income;
import com.project.backend.payloads.GraphDataDto;
import com.project.backend.payloads.TotalResponse;
import com.project.backend.payloads.RecentHistoryResponse;
import com.project.backend.payloads.TransactionDto;
import com.project.backend.repository.ExpenseRepository;
import com.project.backend.repository.FinancialGoalsRepository;
import com.project.backend.repository.IncomeRepository;
import com.project.backend.services.TransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<GraphDataDto> getGraphData(Long userId, LocalDate startDate, LocalDate endDate) {
        List<Income> incomes = incomeRepository.findByUser_UserIdAndDateBetween(userId, startDate, endDate);
        List<Expense> expenses = expenseRepository.findByUser_UserIdAndDateBetween(userId, startDate, endDate);

        Map<LocalDate, GraphDataDto> graphDataMap = new TreeMap<>();

        incomes.forEach(income -> {
            LocalDate date = income.getDate();
            graphDataMap.putIfAbsent(date, new GraphDataDto());
            GraphDataDto graphData = graphDataMap.get(date);
            graphData.setDate(date);
            graphData.setTotalIncome(graphData.getTotalIncome().add(income.getAmount()));
        });

        expenses.forEach(expense -> {
            LocalDate date = expense.getDate();
            graphDataMap.putIfAbsent(date, new GraphDataDto());
            GraphDataDto graphData = graphDataMap.get(date);
            graphData.setDate(date);
            graphData.setTotalExpense(graphData.getTotalExpense().add(expense.getAmount()));
        });

        return new ArrayList<>(graphDataMap.values());
    }

    @Override
    public TotalResponse getTotalIncomeAndExpenses(Long userId) {
        BigDecimal totalIncome = incomeRepository.findByUser_UserId(userId, PageRequest.of(0, Integer.MAX_VALUE)).getContent()
                .stream()
                .map(Income::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenseRepository.findByUser_UserId(userId, PageRequest.of(0, Integer.MAX_VALUE)).getContent()
                .stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalBalance = totalIncome.subtract(totalExpense);

        TotalResponse totalResponse = new TotalResponse();
        totalResponse.setTotalIncome(totalIncome);
        totalResponse.setTotalExpense(totalExpense);
        totalResponse.setTotalBalance(totalBalance);

        return totalResponse;
    }

    @Override
    public RecentHistoryResponse getRecentHistory(Long userId, int limit) {
        List<Income> incomes = incomeRepository.findByUser_UserId(userId, PageRequest.of(0, Integer.MAX_VALUE)).getContent();
        List<Expense> expenses = expenseRepository.findByUser_UserId(userId, PageRequest.of(0, Integer.MAX_VALUE)).getContent();
        

        List<TransactionDto> transactions = new ArrayList<>();

        incomes.forEach(income -> {
            TransactionDto transactionDto = modelMapper.map(income, TransactionDto.class);
            transactionDto.setType("income");
            transactions.add(transactionDto);
        });

        expenses.forEach(expense -> {
            TransactionDto transactionDto = modelMapper.map(expense, TransactionDto.class);
            transactionDto.setType("expense");
            transactions.add(transactionDto);
        });

        transactions.sort(Comparator.comparing(TransactionDto::getDate).reversed());

        RecentHistoryResponse recentHistoryResponse = new RecentHistoryResponse();
        recentHistoryResponse.setRecentTransactions(transactions.stream().limit(limit).collect(Collectors.toList()));

        return recentHistoryResponse;
    }
}
