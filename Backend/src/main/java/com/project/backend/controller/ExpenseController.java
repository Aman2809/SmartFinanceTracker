package com.project.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.configuration.AppConstraints;
import com.project.backend.enums.ExpenseCategory;
import com.project.backend.payloads.ApiResponse;
import com.project.backend.payloads.ExpenseDto;
import com.project.backend.payloads.ExpenseResponse;
import com.project.backend.services.ExpenseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/")
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseService;
	
	// POST --> create Expense
	
	@PostMapping("/user/{userId}/expenses")
	public ResponseEntity<ExpenseDto> createExpense(@Valid  @RequestBody ExpenseDto expenseDto , @PathVariable Long userId){
		
		ExpenseDto createdExpense= this.expenseService.creaeExpense(expenseDto, userId);
		return new ResponseEntity<ExpenseDto>(createdExpense, HttpStatus.OK);
	}
	
	
	// PUT --> update Expenses
	
	@PutMapping("/expenses/{expenseId}")
	public ResponseEntity<ExpenseDto> updateExpense(@Valid  @RequestBody ExpenseDto expenseDto , @PathVariable Long expenseId){
		
		ExpenseDto updatedExpense= this.expenseService.updateExpense(expenseDto, expenseId);
		return new ResponseEntity<ExpenseDto>(updatedExpense,HttpStatus.OK);
	}
	
	
	//GET --> get Expense By Id
	
	@GetMapping("/expenses/{expenseId}")
	public ResponseEntity<ExpenseDto> getExpenseById(@Valid @PathVariable Long expenseId){
		
		return  ResponseEntity.ok(this.expenseService.getExpenseById(expenseId));
	}

	
	 // Get expense by user Id
	
	 @GetMapping("/user/{userId}/expenses")
	    public ResponseEntity<ExpenseResponse> getExpenseByUser(@PathVariable Long userId,
	    		 @RequestParam(value="pageNumber",defaultValue=AppConstraints.PAGE_NUMBER,required=false)Integer pageNumber,
				 @RequestParam(value="pageSize",defaultValue=AppConstraints.PAGE_SIZE,required=false)Integer pageSize,
				 @RequestParam(value="sortBy",defaultValue=AppConstraints.SORT_BY,required=false)String sortBy,
				 @RequestParam(value="sortDir",defaultValue=AppConstraints.SORT_DIR,required=false)String sortDir) {
		 
		 
	        ExpenseResponse goals = this.expenseService.getExpenseByUser(userId , pageNumber, pageSize,sortBy,sortDir);
	        return new ResponseEntity<ExpenseResponse>(goals,HttpStatus.OK);
	    }
	 
	// GET --> get Expenses by User and Category
	 
	    @GetMapping("/users/{userId}/expenses/category/{category}")
	    public ResponseEntity<List<ExpenseDto>> getExpensesByUserAndCategory(@PathVariable Long userId, @PathVariable String category) {
	        ExpenseCategory expenseCategory;
	        try {
	            expenseCategory = ExpenseCategory.valueOf(category.toUpperCase());
	        } catch (IllegalArgumentException e) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }

	        List<ExpenseDto> expenses = this.expenseService.getByUserAndCategory(userId, expenseCategory);
	        return new ResponseEntity<>(expenses, HttpStatus.OK);
	    }
	    
	    
	    //GET -- all Expense
	    
		 @GetMapping("/expenses")
		 public ResponseEntity<ExpenseResponse> getAllExpense(
				 @RequestParam(value="pageNumber",defaultValue=AppConstraints.PAGE_NUMBER,required=false)Integer pageNumber,
				 @RequestParam(value="pageSize",defaultValue=AppConstraints.PAGE_SIZE,required=false)Integer pageSize,
				 @RequestParam(value="sortBy",defaultValue=AppConstraints.SORT_BY,required=false)String sortBy,
				 @RequestParam(value="sortDir",defaultValue=AppConstraints.SORT_DIR,required=false)String sortDir){
			 
			 
			 ExpenseResponse allexpense=this.expenseService.getAllExpense(pageNumber, pageSize, sortBy, sortDir);
			 
			 return new ResponseEntity<ExpenseResponse>(allexpense,HttpStatus.OK);

		 }
		 
		 @GetMapping("/user/{userId}/expenses/{startDate}/{endDate}")
		    public ResponseEntity<List<ExpenseDto>> getExpensesByUserAndDate(
		            @PathVariable Long userId, 
		            @PathVariable String startDate, 
		            @PathVariable String endDate) {
		        LocalDate start = LocalDate.parse(startDate);
		        LocalDate end = LocalDate.parse(endDate);
		        List<ExpenseDto> expenses = expenseService.findByUser_UserIdAndDateBetween(userId, start, end);
		        return new ResponseEntity<>(expenses, HttpStatus.OK);
		    }
		 
		 
			//Delete Expense -->Delete

				@DeleteMapping("/expenses/{expenseId}")
				public ApiResponse deleteFinancialGoal(@PathVariable Long expenseId){
					this.expenseService.deleteExpense(expenseId);
					return new ApiResponse("Expense Deleted Successfully" , true);

				}
				
				
				
				@GetMapping("/expenses/categories")
			    public ResponseEntity<ExpenseCategory[]> getExpenseCategories() {
			        ExpenseCategory[] categories = ExpenseCategory.values();
			        return new ResponseEntity<>(categories, HttpStatus.OK);
			    }
		 
}
