package com.project.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.project.backend.enums.IncomeCategory;
import com.project.backend.payloads.ApiResponse;
import com.project.backend.payloads.IncomeDto;
import com.project.backend.payloads.IncomeResponse;
import com.project.backend.services.IncomeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
public class IncomeController {
	
	
	@Autowired
	private IncomeService incomeService;
	
	
	//POST --> create Income
	
	@PostMapping("/user/{userId}/incomes")
	public ResponseEntity<IncomeDto> createIncome(@Valid @RequestBody IncomeDto incomeDto , @PathVariable Long userId){
		
		IncomeDto createdIncome = this.incomeService.createIncome(incomeDto, userId);
		return new ResponseEntity<IncomeDto>(createdIncome, HttpStatus.OK);
	}
	
	
	// PUT --> Update Income
	
	@PutMapping("incomes/{incomeId}")
	public ResponseEntity<IncomeDto> updateIncome(@Valid @RequestBody IncomeDto incomeDto , @PathVariable Long incomeId){
		
		IncomeDto updatedIncome = this.incomeService.updateIncome(incomeDto, incomeId);
		return new ResponseEntity<IncomeDto>(updatedIncome , HttpStatus.OK);
	}
	
	//GET --> get Income By Id
	
		@GetMapping("/incomes/{incomeId}")
			public ResponseEntity<IncomeDto> getIncomeById(@Valid  @PathVariable Long incomeId){
				
			return ResponseEntity.ok(this.incomeService.getIncomeById(incomeId));
			
			}
		
		
		 // Get Income by user Id
		 @GetMapping("/user/{userId}/incomes")
		    public ResponseEntity<IncomeResponse> getIncomesByUser(@PathVariable Long userId,
		    		 @RequestParam(value="pageNumber",defaultValue=AppConstraints.PAGE_NUMBER,required=false)Integer pageNumber,
					 @RequestParam(value="pageSize",defaultValue=AppConstraints.PAGE_SIZE,required=false)Integer pageSize,
					 @RequestParam(value="sortBy",defaultValue=AppConstraints.SORT_BY,required=false)String sortBy,
					 @RequestParam(value="sortDir",defaultValue=AppConstraints.SORT_DIR,required=false)String sortDir) {
			 
			 
		        IncomeResponse incomes = this.incomeService.getIncomesByUser(userId, pageNumber, pageSize, sortBy, sortDir);
		        return new ResponseEntity<IncomeResponse>(incomes,HttpStatus.OK);
		    }
		 
		 
		// GET --> get Incomes by User and Category
		 
		    @GetMapping("/users/{userId}/incomes/category/{category}")
		    public ResponseEntity<List<IncomeDto>> getIncomesByUserAndCategory(@PathVariable Long userId, @PathVariable String category) {
		        IncomeCategory incomeCategory;
		        try {
		        	incomeCategory = IncomeCategory.valueOf(category.toUpperCase());
		        } catch (IllegalArgumentException e) {
		            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		        }

		        List<IncomeDto> incomes = this.incomeService.getIncomesByUserAndCategory(userId, incomeCategory);
		        return new ResponseEntity<>(incomes, HttpStatus.OK);
		    }
		    
		    
		  //GET -- all Incomes

			 @GetMapping("/incomes")
			 public ResponseEntity<IncomeResponse> getAllIncomes(
					 @RequestParam(value="pageNumber",defaultValue=AppConstraints.PAGE_NUMBER,required=false)Integer pageNumber,
					 @RequestParam(value="pageSize",defaultValue=AppConstraints.PAGE_SIZE,required=false)Integer pageSize,
					 @RequestParam(value="sortBy",defaultValue=AppConstraints.SORT_BY,required=false)String sortBy,
					 @RequestParam(value="sortDir",defaultValue=AppConstraints.SORT_DIR,required=false)String sortDir){
				 
				 
				 IncomeResponse allIncomes=this.incomeService.getAllIncomes(pageNumber, pageSize, sortBy, sortDir);
				 return new ResponseEntity<IncomeResponse>(allIncomes,HttpStatus.OK);

			 }
			 
			 
			 //GET -- all Incomes between dates
			 
			 @GetMapping("/user/{userId}/incomes/{startDate}/{endDate}")
			    public ResponseEntity<List<IncomeDto>> getIncomesByUserAndDateBetween(
			            @PathVariable Long userId, 
			            @PathVariable String startDate, 
			            @PathVariable String endDate) {
			        LocalDate start = LocalDate.parse(startDate);
			        LocalDate end = LocalDate.parse(endDate);
			        List<IncomeDto> incomes = this.incomeService.getIncomesByUserAndDateBetween(userId, start, end);
			        return new ResponseEntity<>(incomes, HttpStatus.OK);
			    }
			 
			 
			//Delete Incomes -->Delete

				@DeleteMapping("/incomes/{incomeId}")
				public ApiResponse deleteFinancialGoal(@PathVariable Long incomeId){
					this.incomeService.deleteIncome(incomeId);
					return new ApiResponse("Income Deleted Successfully" , true);

				}
				

				@GetMapping("/incomes/categories")
			    public ResponseEntity<IncomeCategory[]> getIncomeCategories() {
			        IncomeCategory[] categories = IncomeCategory.values();
			        return new ResponseEntity<>(categories, HttpStatus.OK);
			    }
		

}
