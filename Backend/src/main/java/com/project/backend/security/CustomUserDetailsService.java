package com.project.backend.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.model.User;
import com.project.backend.repository.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;
	
	
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		//Loding User From Database by Username
		
		User user = this.userRepository.findByUsername(username)
				.orElseThrow(()->new ResourceNotFoundException("User", "username: "+username, 0));
		
		
		return user;
	}
	
	
	
	
	
	
	

}
