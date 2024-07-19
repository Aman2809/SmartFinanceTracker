package com.project.backend.services.impl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.model.FinancialGoals;
import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.repository.FinancialGoalsRepository;
import com.project.backend.services.FinancialGoalsService;

@Service
public class FinancialGoalsServiceImpl implements FinancialGoalsService{

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private FinancialGoalsRepository financialGoalsRepository;


	@Override
	public FinancialGoalsDto createFinancialGoal(FinancialGoalsDto goalDto) {
		FinancialGoals financialGoals = this.goalsDtoToGoal(goalDto);
		FinancialGoals savedGoals=this.financialGoalsRepository.save(financialGoals);
		return this.goalTogoalDto(savedGoals);
	}

	@Override
	public FinancialGoalsDto updateFinancialGoal(FinancialGoalsDto goalDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<FinancialGoalsDto> getFinancialGoalsByUserId(String userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<FinancialGoalsDto> getFinancialGoalById(Long goalsId) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public void deleteFinancialGoal(Long goalsId) {
		// TODO Auto-generated method stub
		
	}
	
	
	private FinancialGoals goalsDtoToGoal(FinancialGoalsDto goalDto) {
		FinancialGoals financialGoals=this.modelMapper.map(goalDto , FinancialGoals.class);
		
		
		return financialGoals;
		
	}
	
	private FinancialGoalsDto goalTogoalDto(FinancialGoals goal) {
		FinancialGoalsDto financialGoalsDto=this.modelMapper.map(goal , FinancialGoalsDto.class);
		
		
		return financialGoalsDto;
		
	}

}
