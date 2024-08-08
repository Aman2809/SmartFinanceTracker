package com.project.backend.services.impl;


import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.project.backend.enums.IncomeCategory;
import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.model.Income;
import com.project.backend.model.User;
import com.project.backend.payloads.IncomeDto;
import com.project.backend.payloads.IncomeResponse;
import com.project.backend.repository.IncomeRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.IncomeService;

@Service
public class IncomeServiceImpl implements IncomeService {

	 @Autowired
	    private IncomeRepository incomeRepository;

	    @Autowired
	    private UserRepository userRepository;

	    @Autowired
	    private ModelMapper modelMapper;

	    @Override
	    public IncomeDto createIncome(IncomeDto incomeDto, Long userId) {
	    	
	    	Income income=this.dtoToIncome(incomeDto);
	        User user=this.userRepository.findById(userId)
	        		.orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
	        income.setUser(user);
	        Income savedIncome = incomeRepository.save(income);
	        return modelMapper.map(savedIncome, IncomeDto.class);
	    }

	    @Override
	    public IncomeDto updateIncome(IncomeDto incomeDto, Long incomeId) {
	        Income income = this.incomeRepository.findById(incomeId)
	                .orElseThrow(() -> new ResourceNotFoundException("Income", "id", incomeId));
	        income.setSource(incomeDto.getSource());
	        income.setAmount(incomeDto.getAmount());
	        income.setDate(incomeDto.getDate());
	        income.setCategory(incomeDto.getCategory());
	        Income updatedIncome = incomeRepository.save(income);
	        return modelMapper.map(updatedIncome, IncomeDto.class);
	    }

	    @Override
	    public void deleteIncome(Long incomeId) {
	        Income income = this.incomeRepository.findById(incomeId)
	                .orElseThrow(() -> new ResourceNotFoundException("Income", "id", incomeId));
	        incomeRepository.delete(income);
	    }

	    @Override
	    public IncomeDto getIncomeById(Long incomeId) {
	        Income income = incomeRepository.findById(incomeId)
	                .orElseThrow(() -> new ResourceNotFoundException("Income", "id", incomeId));
	        return this.incomeToDto(income);
	    }

	    @Override
	    public IncomeResponse getAllIncomes(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
	        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
	        Pageable pageable=PageRequest.of(pageNumber, pageSize, sort);
	        Page<Income> pageIncome = incomeRepository.findAll(pageable);
	        List<IncomeDto> incomeDtos = pageIncome.getContent().stream()
	                .map(income -> modelMapper.map(income, IncomeDto.class))
	                .collect(Collectors.toList());
	        IncomeResponse incomeResponse = new IncomeResponse();
	        incomeResponse.setContent(incomeDtos);
	        incomeResponse.setPageNumber(pageIncome.getNumber());
	        incomeResponse.setPageSize(pageIncome.getSize());
	        incomeResponse.setTotalElements(pageIncome.getTotalElements());
	        incomeResponse.setTotalPages(pageIncome.getTotalPages());
	        return incomeResponse;
	    }

	    @Override
	    public IncomeResponse getIncomesByUser(Long userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
	        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
	        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
	        Page<Income> pageIncome = incomeRepository.findByUser_UserId(userId, pageable);
	        
	        List<Income> income = pageIncome.getContent();
	        List<IncomeDto> incomeDtos =income.stream()
	                .map(inc -> modelMapper.map(inc, IncomeDto.class))
	                .collect(Collectors.toList());
	        
	        IncomeResponse incomeResponse = new IncomeResponse();
	        incomeResponse.setContent(incomeDtos);
	        incomeResponse.setPageNumber(pageIncome.getNumber());
	        incomeResponse.setPageSize(pageIncome.getSize());
	        incomeResponse.setTotalElements(pageIncome.getTotalElements());
	        incomeResponse.setTotalPages(pageIncome.getTotalPages());
	        return incomeResponse;
	    }

	    @Override
	    public List<IncomeDto> getIncomesByUserAndCategory(Long userId, IncomeCategory category) {
	        List<Income> incomes = incomeRepository.findByUser_UserIdAndCategory(userId, category);
	        return incomes.stream()
	                .map(income -> modelMapper.map(income, IncomeDto.class))
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<IncomeDto> getIncomesByUserAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate) {
	        List<Income> incomes = incomeRepository.findByUser_UserIdAndDateBetween(userId, startDate, endDate);
	        return incomes.stream()
	                .map(income -> modelMapper.map(income, IncomeDto.class))
	                .collect(Collectors.toList());
	    }
	    
	    
	    @Override
	    public Double getTotalIncomeByUser(Long userId) {
	        Double totalIncome = incomeRepository.getTotalIncomeByUser_UserId(userId);
	        return totalIncome != null ? totalIncome : 0.0;
	    }

		
		
		
		private Income dtoToIncome(IncomeDto incomeDto) {
			Income income=this.modelMapper.map(incomeDto, Income.class);
			return income;
		}
		
		private IncomeDto incomeToDto(Income income) {
			IncomeDto incomeDto = this.modelMapper.map(income, IncomeDto.class);
			return incomeDto;
		}

		

}
