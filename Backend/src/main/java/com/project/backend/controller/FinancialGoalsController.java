package com.project.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.payloads.FinancialGoalsDto;
import com.project.backend.services.FinancialGoalsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/financial-goals")
public class FinancialGoalsController {
	
	@Autowired
    private FinancialGoalsService financialGoalService;
	
	
	 @PostMapping("/")
	    public ResponseEntity<FinancialGoalsDto> createFinancialGoal(@Valid @RequestBody FinancialGoalsDto goalsDto) {
	        FinancialGoalsDto createdGoal = this.financialGoalService.createFinancialGoal(goalsDto);
	        return ResponseEntity.ok(createdGoal);
	    }
	
}
