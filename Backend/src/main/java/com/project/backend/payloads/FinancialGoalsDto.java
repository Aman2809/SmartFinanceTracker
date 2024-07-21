package com.project.backend.payloads;

import com.project.backend.model.User;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FinancialGoalsDto {
	
	 private Long goalsId;
		
		@NotEmpty
		@Size(min=3,message="Goal name must be of minimum 3 character !! ")
		private String name;
		
		@NotEmpty
		@Size(min=3,message="description name must be of minimum 3 character !! ")
	    private String description;
	    
		 @NotNull
		 @DecimalMin("0.0")
	    private double targetAmount;
	    
		 @NotNull
		 @DecimalMin("0.0")
	    private double currentAmount;
	    
		private UserDto user;
	    

}
