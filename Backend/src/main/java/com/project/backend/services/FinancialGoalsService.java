package com.project.backend.services;


import java.util.List;
import java.util.Optional;

import com.project.backend.payloads.FinancialGoalsDto;

public interface FinancialGoalsService {

	

	FinancialGoalsDto createFinancialGoal(FinancialGoalsDto goal,Long userId);
	FinancialGoalsDto updateFinancialGoal(FinancialGoalsDto goal,Long id);
	
	List<FinancialGoalsDto> getFinancialGoalsByUserId(Long userId);
	 
	 FinancialGoalsDto getFinancialGoalById(Long id);
	 
	 List<FinancialGoalsDto> getAllGoals(Integer pageNumber , Integer pageSize);

	
	 void deleteFinancialGoal(Long id);
	
}
