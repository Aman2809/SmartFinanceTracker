package com.project.backend.services;

import java.time.LocalDate;
import java.util.List;

import com.project.backend.payloads.ExpenseDto;
import com.project.backend.payloads.ExpenseResponse;

public interface ExpenseService {
	
	ExpenseDto creaeExpense(ExpenseDto expenseDto , Long userId);
	ExpenseDto updateExpense(ExpenseDto expenseDto, Long expenseId);
	
	ExpenseResponse getExpenseByUser(Long userId , Integer pageNumber, Integer pageSize, String sortBy,String sortDir);
	
	ExpenseDto getExpenseById(Long expenseId);
	
	List<ExpenseDto> getByCategory(String category);
	
	 List<ExpenseDto> findByUser_UserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
	
	ExpenseResponse getAllExpense(Integer pageNumber , Integer pageSize, String sortBy,String sortDir);
	
	void deleteExpense(Long expenseId);
	 
	 
	
	

}
