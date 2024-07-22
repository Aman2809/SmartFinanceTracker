package com.project.backend.controller;



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

import com.project.backend.payloads.ApiResponse;
import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.payloads.GoalsResponse;
import com.project.backend.services.FinancialGoalsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/")
public class FinancialGoalsController {
	
	@Autowired
    private FinancialGoalsService financialGoalService;
	
	
	
	//POST -add  Goals

	 @PostMapping("/user/{userId}/financial-goals")
	    public ResponseEntity<FinancialGoalsDto> createFinancialGoal(@Valid @RequestBody FinancialGoalsDto goalsDto, @PathVariable Long userId) {
	        FinancialGoalsDto createdGoal = this.financialGoalService.createFinancialGoal(goalsDto,userId);
	        return new ResponseEntity<FinancialGoalsDto>(createdGoal,HttpStatus.CREATED);
	    }
	
	 //PUT - update Goals
	 @PutMapping("/financial-goals/{goalsId}")
	 public ResponseEntity<FinancialGoalsDto> updateFinancialGoal(@Valid @RequestBody FinancialGoalsDto goalDto,@PathVariable Long goalsId){
		 
		 FinancialGoalsDto updatdFinancialGoals = this.financialGoalService.updateFinancialGoal(goalDto, goalsId);

		 
		 return ResponseEntity.ok(updatdFinancialGoals);
	 }
	 
	 

	 // Get financial goals by user ID
	 @GetMapping("/user/{userId}/financial-goals")
	    public ResponseEntity<GoalsResponse> getFinancialGoalsByUserId(@PathVariable Long userId,
	    		@RequestParam(value="pageNumber",defaultValue="0",required=false)Integer pageNumber,
				 @RequestParam(value="pageSize",defaultValue="5",required=false)Integer pageSize) {
		 
		 
	        GoalsResponse goals = this.financialGoalService.getFinancialGoalsByUserId(userId , pageNumber, pageSize);
	        return new ResponseEntity<GoalsResponse>(goals,HttpStatus.OK);
	    }
		 
		 
		 //GET -- get by id
		 @GetMapping("/financial-goals/{goalsId}")
		    public ResponseEntity<FinancialGoalsDto> getFinancialGoalById(@PathVariable Long goalsId) {

		        return ResponseEntity.ok(this.financialGoalService.getFinancialGoalById(goalsId));
		    }
		 
		 //GET -- all Goals
		 @GetMapping("/financial-goals")
		 public ResponseEntity<GoalsResponse> getAllGoals(@RequestParam(value="pageNumber",defaultValue="0",required=false)Integer pageNumber,
				 @RequestParam(value="pageSize",defaultValue="5",required=false)Integer pageSize){
			 
			 
			 GoalsResponse allGoals=this.financialGoalService.getAllGoals( pageNumber,  pageSize);
			 
			 return new ResponseEntity<GoalsResponse>(allGoals,HttpStatus.OK);

		 }
		 
		 
		 
		//Delete Goals -->Delete

			@DeleteMapping("/financial-goals/{goalsId}")
			public ApiResponse deleteFinancialGoal(@PathVariable Long goalsId){
				this.financialGoalService.deleteFinancialGoal(goalsId);
				return new ApiResponse("goal Deleted Successfully" , true);

			}
}
