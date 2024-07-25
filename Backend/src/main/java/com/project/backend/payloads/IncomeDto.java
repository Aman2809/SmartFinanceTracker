package com.project.backend.payloads;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.project.backend.enums.IncomeCategory;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class IncomeDto {
	
	private Long incomeId;
	
	@NotEmpty
	@Size(min=3,message="source name must be of minimum 3 character !! ")
    private String source;
    
	@NotNull(message = "amount cannot be null !! ")
    private BigDecimal amount;
	
	@NotNull(message = "Event date cannot be null")
    private LocalDate date;
	
	 @NotNull(message = "Category cannot be null!")
    private IncomeCategory category;
    
    private UserDto user;
}
