package com.project.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	
	  Page<Expense> findByUser_UserId(Long userId,Pageable pageable);
	  List<Expense> findByCategory(String category);
	  List<Expense> findByUser_UserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

}
