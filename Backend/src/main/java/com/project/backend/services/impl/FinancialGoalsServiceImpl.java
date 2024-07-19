package com.project.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.model.FinancialGoals;
import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.payloads.UserDto;
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
	    public FinancialGoalsDto updateFinancialGoal(FinancialGoalsDto goalDto, Long id) {
	        FinancialGoals financialGoals = this.financialGoalsRepository.findById(id)
	        		.orElseThrow(()-> new ResourceNotFoundException("FinancialGoal", "id", id));
	                
	        financialGoals.setName(goalDto.getName());
	        financialGoals.setDescription(goalDto.getDescription());
	        financialGoals.setTargetAmount(goalDto.getTargetAmount());
	        financialGoals.setCurrentAmount(goalDto.getCurrentAmount());
	        financialGoals.setUserId(goalDto.getUserId());
	        
	        FinancialGoals updatedGoal = this.financialGoalsRepository.save(financialGoals);
	        FinancialGoalsDto goalsDto1=goalTogoalDto(updatedGoal);
	        return goalsDto1;
	        
	    }


	@Override
	public FinancialGoalsDto getFinancialGoalsByUserId(String userId) {
		 FinancialGoals goals = this.financialGoalsRepository.findByUserId(userId);
	        return goalTogoalDto(goals);
	}

	@Override
	public FinancialGoalsDto getFinancialGoalById(Long id) {
		FinancialGoals financialGoals = this.financialGoalsRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("FinancialGoals"," id",id));
		
		return (this.goalTogoalDto(financialGoals));
	}
	
	@Override
	public List<FinancialGoalsDto> getAllGoals() {
		List<FinancialGoals> financialGoals = this.financialGoalsRepository.findAll();
		
		return financialGoals.stream().map(this::goalTogoalDto).collect(Collectors.toList());
	}

	@Override
	public void deleteFinancialGoal(Long id) {
		FinancialGoals financialGoals = this.financialGoalsRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("FinancialGoals","Id",id));
		
		this.financialGoalsRepository.delete(financialGoals);
		
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
