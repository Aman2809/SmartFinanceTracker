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

import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.model.Expense;
import com.project.backend.model.User;
import com.project.backend.payloads.ExpenseDto;
import com.project.backend.payloads.ExpenseResponse;
import com.project.backend.repository.ExpenseRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.ExpenseService;


@Service
public class ExpenseServiceImpl implements ExpenseService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private ExpenseRepository expenseRepo;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public ExpenseDto creaeExpense(ExpenseDto expenseDto, Long userId) {
		
		Expense expense=this.dtoToExpense(expenseDto);
		User user=this.userRepository.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
		
		expense.setUser(user);
		Expense savedExpense=this.expenseRepo.save(expense);
		
		ExpenseDto savedExpenseDto = this.ExpenseToDto(savedExpense);
		
		return savedExpenseDto;
	}

	@Override
	public ExpenseDto updateExpense(ExpenseDto expenseDto, Long expenseId) {
		Expense expense = this.expenseRepo.findById(expenseId)
				.orElseThrow(()->new ResourceNotFoundException("Expense","id",expenseId));
		
		expense.setDescription(expenseDto.getDescription());
		expense.setAmount(expenseDto.getAmount());
		expense.setCategory(expenseDto.getCategory());
		expense.setDate(expenseDto.getDate());
		
		Expense updatedExpense=this.expenseRepo.save(expense);
		ExpenseDto expenseDto1= this.ExpenseToDto(updatedExpense);
		
		
		return expenseDto1;
	}

	@Override
	public ExpenseResponse getExpenseByUser(Long userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
	    Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
	    Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
	    Page<Expense> pageExpenses = this.expenseRepo.findByUser_UserId(userId, pageable);

	    
	    List<Expense> expense = pageExpenses.getContent();
	    List<ExpenseDto> expenseDtos = expense.stream().map(exp->this.modelMapper.map(exp, ExpenseDto.class)).collect(Collectors.toList());
	           
	    ExpenseResponse expenseResponse = new ExpenseResponse();
	    expenseResponse.setExpenseContent(expenseDtos);
	    expenseResponse.setPageNumber(pageExpenses.getNumber());
	    expenseResponse.setPageSize(pageExpenses.getSize());
	    expenseResponse.setTotalElement(pageExpenses.getTotalElements());
	    expenseResponse.setTotalPages(pageExpenses.getTotalPages());
	    expenseResponse.setLastPage(pageExpenses.isLast());

	    return expenseResponse;
	}


	@Override
	public ExpenseDto getExpenseById(Long expenseId) {
		  
		Expense expense = this.expenseRepo.findById(expenseId)
				.orElseThrow(()->new ResourceNotFoundException("Expense","Id",expenseId));
		
		return this.ExpenseToDto(expense);
	}
	
	@Override
	public List<ExpenseDto> getByCategory(String category) {
		List<Expense> expense = this.expenseRepo.findByCategory(category);
		
		return expense.stream()
	            .map(exp->this.modelMapper.map(exp, ExpenseDto.class))
	            .collect(Collectors.toList());
	}

	@Override
	public ExpenseResponse getAllExpense(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
	    Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
	    Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
	    Page<Expense> pageExpenses = this.expenseRepo.findAll(pageable);

	    List<ExpenseDto> expenseDtos = pageExpenses.getContent().stream().map(exp->this.modelMapper.map(exp, ExpenseDto.class)).collect(Collectors.toList());

	    ExpenseResponse expenseResponse = new ExpenseResponse();
	    expenseResponse.setExpenseContent(expenseDtos);
	    expenseResponse.setPageNumber(pageExpenses.getNumber());
	    expenseResponse.setPageSize(pageExpenses.getSize());
	    expenseResponse.setTotalElement(pageExpenses.getTotalElements());
	    expenseResponse.setTotalPages(pageExpenses.getTotalPages());
	    expenseResponse.setLastPage(pageExpenses.isLast());

	    return expenseResponse;
	}

	@Override
	public void deleteExpense(Long expenseId) {
		Expense expense=this.expenseRepo.findById(expenseId)
				.orElseThrow(()->new ResourceNotFoundException("Expense","id",expenseId));
		
		this.expenseRepo.delete(expense);
		
	}
	
	
	
	private Expense dtoToExpense(ExpenseDto expenseDto) {
		
		Expense expense = this.modelMapper.map(expenseDto, Expense.class);
		return expense;
	}
	
	private ExpenseDto ExpenseToDto(Expense expense) {
		ExpenseDto expenseDto= this.modelMapper.map(expense, ExpenseDto.class);
		return expenseDto;
	}

	@Override
	public List<ExpenseDto> findByUser_UserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate) {
		List<Expense> expenses = expenseRepo.findByUser_UserIdAndDateBetween(userId, startDate, endDate);
        return expenses.stream().map(exp->this.modelMapper.map(exp, ExpenseDto.class)).collect(Collectors.toList());
	}

	

}
