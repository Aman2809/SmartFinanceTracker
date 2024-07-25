package com.project.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.project.backend.enums.IncomeCategory;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "incomes")
@NoArgsConstructor
@Getter
@Setter
public class Income {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long incomeId;


    private String source;
    
    private BigDecimal amount;
    

    private LocalDate date;
    
    @Enumerated(EnumType.STRING)
    private IncomeCategory category;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	    
	

}
