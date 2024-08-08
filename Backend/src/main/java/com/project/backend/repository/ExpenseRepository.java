package com.project.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.enums.ExpenseCategory;
import com.project.backend.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	
	  Page<Expense> findByUser_UserId(Long userId,Pageable pageable);
	  List<Expense> findByUser_UserIdAndCategory(Long userId, ExpenseCategory category);
	  List<Expense> findByUser_UserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
	  
	  @Query("SELECT SUM(i.amount) FROM Expense i WHERE i.user.userId = :userId")
	    Double getTotalExpenseByUser_UserId(@Param("userId") Long userId);

}
