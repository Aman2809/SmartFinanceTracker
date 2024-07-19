package com.project.backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.model.FinancialGoals;

public interface FinancialGoalsRepository extends JpaRepository<FinancialGoals, Long> {
	 List<FinancialGoals> findByUser_UserId(Long userId);
}
