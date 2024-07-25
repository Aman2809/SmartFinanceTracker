package com.project.backend.payloads;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class IncomeResponse {
	 private List<IncomeDto> content;
	    private int pageNumber;
	    private int pageSize;
	    private long totalElements;
	    private int totalPages;
	    private boolean last;
}
