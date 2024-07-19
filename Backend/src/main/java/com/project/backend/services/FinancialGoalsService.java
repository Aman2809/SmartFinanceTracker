package com.project.backend.services;

import java.util.List;
import java.util.Optional;

import com.project.backend.payloads.FinancialGoalsDto;

public interface FinancialGoalsService {

	
	FinancialGoalsDto createFinancialGoal(FinancialGoalsDto goal);
	FinancialGoalsDto updateFinancialGoal(FinancialGoalsDto goal);
	
	 List<FinancialGoalsDto> getFinancialGoalsByUserId(String userId);
	 Optional<FinancialGoalsDto> getFinancialGoalById(Long goalsId);
	
	 void deleteFinancialGoal(Long goalsId);
	
}
