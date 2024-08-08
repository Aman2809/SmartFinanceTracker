package com.project.backend.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.enums.IncomeCategory;
import com.project.backend.model.Income;

public interface IncomeRepository extends JpaRepository<Income , Long> {
		
	 // Find incomes by user ID
	Page<Income> findByUser_UserId(Long userId, Pageable pageable);

    // Find incomes by user ID and category
	 List<Income> findByUser_UserIdAndCategory(Long userId, IncomeCategory category);

    // Find incomes by user ID and date range
	 List<Income> findByUser_UserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
	 
	 
	 @Query("SELECT SUM(i.amount) FROM Income i WHERE i.user.userId = :userId")
	    Double getTotalIncomeByUser_UserId(@Param("userId") Long userId);
	 
}
