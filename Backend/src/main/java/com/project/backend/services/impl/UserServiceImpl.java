package com.project.backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.security.auth.login.AppConfigurationEntry;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.backend.configuration.AppConstraints;
import com.project.backend.exceptions.ResourceNotFoundException;
import com.project.backend.model.Role;
import com.project.backend.model.User;
import com.project.backend.payloads.UserDto;
import com.project.backend.repository.RoleRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.services.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user = this.dtoToUser(userDto);
		User savedUser=this.userRepository.save(user);
		
		return this.userToDto(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Long userId) {
		
		User user =this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User"," id",userId));
		
		
		user.setPassword(userDto.getPassword());
		user.setUsername(userDto.getUsername());
		user.setEmail(userDto.getEmail());
		
		User updatedUser= this.userRepository.save(user);
		UserDto userDto1=this.userToDto(updatedUser);
		return userDto1;
	}   

	@Override
	public UserDto getUserById(Long userId) {
		User user =this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User"," id",userId));
		return this.userToDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users= this.userRepository.findAll();
		List<UserDto> userDtos =users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public void deleteUser(Long userId) {
		
		User user =this.userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User"," id",userId));
		this.userRepository.delete(user);
	}
	
	private User dtoToUser(UserDto userDto) {
		User user=this.modelMapper.map(userDto, User.class);
		
//		user.setId(userDto.getId());
//		user.setUsername(userDto.getUsername());
//		user.setEmail(userDto.getEmail());
//		user.setPassword(userDto.getPassword());
	
		return user;
	}
	
	private UserDto userToDto(User user) {
		UserDto userDto=this.modelMapper.map(user, UserDto.class);
		
		
//		userDto.setId(user.getId());
//		userDto.setEmail(user.getEmail());
//		userDto.setPassword(user.getPassword());
//		userDto.setUsername(user.getUsername());
		return userDto;
		
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		
		User user = this.modelMapper.map(userDto, User.class);
		
		//Encoding the password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		
		//Assigning ROLES to new User
		Role role = this.roleRepository.findById(AppConstraints.NORMAL_USER).get();
		
		user.getRoles().add(role);
		
		User newUser = this.userRepository.save(user);
		
		return this.modelMapper.map(newUser, UserDto.class);
	}
	
}
