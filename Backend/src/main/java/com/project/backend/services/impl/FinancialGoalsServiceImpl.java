package com.project.backend.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.model.FinancialGoals;
import com.project.backend.model.User;
import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.payloads.UserDto;
import com.project.backend.repository.FinancialGoalsRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.FinancialGoalsService;
import org.springframework.data.domain.Pageable;


@Service
public class FinancialGoalsServiceImpl implements FinancialGoalsService{

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private FinancialGoalsRepository financialGoalsRepository;
	
	 @Autowired
	    private UserRepository userRepository;


	@Override
	public FinancialGoalsDto createFinancialGoal(FinancialGoalsDto goalDto,Long userId) {
		FinancialGoals financialGoals = this.goalsDtoToGoal(goalDto);
		 User user = userRepository.findById(userId)
	                .orElseThrow(() -> new ResourceNotFoundException("User", "id",userId));
	        financialGoals.setUser(user);
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
	    
	        
	        FinancialGoals updatedGoal = this.financialGoalsRepository.save(financialGoals);
	        FinancialGoalsDto goalsDto1=goalTogoalDto(updatedGoal);
	        return goalsDto1;
	        
	    }


	 @Override
	    public List<FinancialGoalsDto> getFinancialGoalsByUserId(Long userId) {
	        List<FinancialGoals> goals = this.financialGoalsRepository.findByUser_UserId(userId);
	        return goals.stream().map(goal -> modelMapper.map(goal, FinancialGoalsDto.class))
	                .collect(Collectors.toList());
	    }

	@Override
	public FinancialGoalsDto getFinancialGoalById(Long id) {
		FinancialGoals financialGoals = this.financialGoalsRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("FinancialGoals"," Id",id));
		
		return this.goalTogoalDto(financialGoals);
	}
	
	@Override
	public List<FinancialGoalsDto> getAllGoals(Integer pageNumber , Integer pageSize) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize);
		
		Page<FinancialGoals> pageGoals = this.financialGoalsRepository.findAll(p);
		
		List<FinancialGoals> allGoals = pageGoals.getContent();
		
	   List<FinancialGoalsDto> financialGoalsDto = allGoals.stream().map((goal)-> this.modelMapper.map(goal,FinancialGoalsDto.class)).collect(Collectors.toList());
	   return financialGoalsDto;
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
