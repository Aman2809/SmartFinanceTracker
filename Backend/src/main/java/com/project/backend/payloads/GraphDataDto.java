package com.project.backend.payloads;

import java.math.BigDecimal;
import java.time.LocalDate;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class GraphDataDto {
	 private LocalDate date;
	    private BigDecimal totalIncome = BigDecimal.ZERO;
	    private BigDecimal totalExpense = BigDecimal.ZERO;
}
