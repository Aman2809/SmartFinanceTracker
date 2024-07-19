package com.project.backend.services;


import java.util.List;
import java.util.Optional;

import com.project.backend.payloads.FinancialGoalsDto;

public interface FinancialGoalsService {

	
	FinancialGoalsDto createFinancialGoal(FinancialGoalsDto goal);
	FinancialGoalsDto updateFinancialGoal(FinancialGoalsDto goal,Long id);
	
	 FinancialGoalsDto getFinancialGoalsByUserId(String userId);
	 
	 FinancialGoalsDto getFinancialGoalById(Long id);
	 
	 List<FinancialGoalsDto> getAllGoals();
	
	 void deleteFinancialGoal(Long id);
	
}
