package com.project.backend.services;


import java.time.LocalDate;
import java.util.List;

import com.project.backend.enums.IncomeCategory;
import com.project.backend.payloads.IncomeDto;
import com.project.backend.payloads.IncomeResponse;

public interface IncomeService {
	
	 IncomeDto createIncome(IncomeDto incomeDto, Long userId);
	    IncomeDto updateIncome(IncomeDto incomeDto, Long incomeId);
	    void deleteIncome(Long incomeId);
	    IncomeDto getIncomeById(Long incomeId);
	    IncomeResponse getAllIncomes(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	    IncomeResponse getIncomesByUser(Long userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	    List<IncomeDto> getIncomesByUserAndCategory(Long userId, IncomeCategory category);
	    List<IncomeDto> getIncomesByUserAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
	}
	

