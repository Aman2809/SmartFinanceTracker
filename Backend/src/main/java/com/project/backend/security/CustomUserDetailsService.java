package com.project.backend.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.exceptions.UserNotFoundException;
import com.project.backend.model.User;
import com.project.backend.repository.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;
	
	
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		//Loading User From Database by username
		
		User user = this.userRepository.findByEmail(username)
				.orElseThrow(()->new UserNotFoundException("User", "email  ", username));
		
		
		return user;
	}
	
	
	
	
	
	
	

}
