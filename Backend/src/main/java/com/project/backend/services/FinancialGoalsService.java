package com.project.backend.services;



import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.payloads.GoalsResponse;

public interface FinancialGoalsService {

	

	FinancialGoalsDto createFinancialGoal(FinancialGoalsDto goal,Long userId);
	FinancialGoalsDto updateFinancialGoal(FinancialGoalsDto goal,Long id);
	
	GoalsResponse getFinancialGoalsByUserId(Long userId , Integer pageNumber, Integer pageSize);
	 
	 FinancialGoalsDto getFinancialGoalById(Long id);
	 
	 GoalsResponse getAllGoals(Integer pageNumber , Integer pageSize);

	
	 void deleteFinancialGoal(Long id);
	
}
