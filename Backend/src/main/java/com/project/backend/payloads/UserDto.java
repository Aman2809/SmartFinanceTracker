package com.project.backend.payloads;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.backend.model.Role;

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
	
	@NotEmpty(message="email can't be Null")
	@Email(message="Email address is not Valid !! ")
	private String email;
	
	@NotEmpty
	@Size(min=3 , max=10, message="Password must be minumum of 3 chars and maimum of 10 chars !! ")
	private String password;
	
	
	 private Set<RoleDto> roles=  new HashSet<>();
	
	
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
	
	@JsonIgnore
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
	public Set<RoleDto> getRoles() {
		return roles;
	}
	public void setRoles(Set<RoleDto> roles) {
		this.roles = roles;
	}
	
	
}
