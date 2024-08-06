package com.project.backend.model;

import com.project.backend.payloads.UserDto;

import lombok.Data;

@Data
public class JwtResponse {
	private  String jwt;
	private  UserDto user;
	

	
}
