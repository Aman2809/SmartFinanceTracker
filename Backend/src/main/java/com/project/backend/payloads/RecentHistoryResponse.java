package com.project.backend.payloads;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RecentHistoryResponse {
	private List<TransactionDto> recentTransactions;
}
