package com.project.backend.payloads;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TransactionDto {
	private String type;
    private BigDecimal amount;
    private LocalDate date;
    private String category;
    private String description;
}
