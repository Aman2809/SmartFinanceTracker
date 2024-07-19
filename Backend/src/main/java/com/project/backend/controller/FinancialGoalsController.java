package com.project.backend.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.payloads.ApiResponse;
import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.payloads.UserDto;
import com.project.backend.services.FinancialGoalsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/financial-goals")
public class FinancialGoalsController {
	
	@Autowired
    private FinancialGoalsService financialGoalService;
	
	
	
	//POST -add  Goals
	 @PostMapping("/")
	    public ResponseEntity<FinancialGoalsDto> createFinancialGoal(@Valid @RequestBody FinancialGoalsDto goalsDto) {
	        FinancialGoalsDto createdGoal = this.financialGoalService.createFinancialGoal(goalsDto);
	        return ResponseEntity.ok(createdGoal);
	    }
	
	 //PUT - update Goals
	 @PutMapping("/{id}")
	 public ResponseEntity<FinancialGoalsDto> updateFinancialGoal(@Valid @RequestBody FinancialGoalsDto goalDto,@PathVariable Long id){
		 
		 FinancialGoalsDto updatdFinancialGoals = this.financialGoalService.updateFinancialGoal(goalDto, id);
		 
		 return ResponseEntity.ok(updatdFinancialGoals);
	 }
	 
	 
	 //GET -- get by userId
		 @GetMapping("/{userId}")
		    public ResponseEntity<FinancialGoalsDto> getFinancialGoalsByUserId(@PathVariable String userId) {

		        return ResponseEntity.ok (this.financialGoalService.getFinancialGoalsByUserId(userId));
		    }
		 
		 
		 //GET -- get by id
		 @GetMapping("/{id}")
		    public ResponseEntity<FinancialGoalsDto> getFinancialGoalById(@PathVariable Long id) {

		        return ResponseEntity.ok (this.financialGoalService.getFinancialGoalById(id));
		    }
		 
		 //GET -- all Goals
		 @GetMapping("/")
		 public ResponseEntity<List<FinancialGoalsDto>> getAllGoals(){
			 
			 
			 return ResponseEntity.ok(this.financialGoalService.getAllGoals());
		 }
		 
		 
		 
		//Delete Goals -->Delete
			@DeleteMapping("/{id}")
			public ResponseEntity<ApiResponse> deleteFinancialGoal(@PathVariable Long id){
				this.financialGoalService.deleteFinancialGoal(id);
				return new ResponseEntity<ApiResponse>(new ApiResponse("goal Deleted Successfully" , true) , HttpStatus.OK);
			}
}
