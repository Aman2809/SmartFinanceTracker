package com.project.backend.repository;




import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.model.FinancialGoals;

public interface FinancialGoalsRepository extends JpaRepository<FinancialGoals, Long> {

	 Page<FinancialGoals> findByUser_UserId(Long userId,Pageable pageable);
	 List<FinancialGoals> findByNameContaining(String name);

}
