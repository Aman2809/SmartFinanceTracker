package com.project.backend.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserDto {
	
	private Long id;
	
	@NotEmpty
	@Size(min=4 , message= "Username must be of min. 4 characters !! ")
	private String username;
	
	@Email(message="Email address is not Valid !! ")
	private String email;
	
	@NotEmpty
	@Size(min=3 , max=10, message="Password must be minumum of 3 chars and maimum of 10 chars !! ")
	private String password;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
