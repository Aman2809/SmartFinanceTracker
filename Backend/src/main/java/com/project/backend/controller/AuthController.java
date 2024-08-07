package com.project.backend.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.model.JwtRequest;
import com.project.backend.model.JwtResponse;
import com.project.backend.model.User;
import com.project.backend.payloads.UserDto;
import com.project.backend.security.CustomUserDetailsService;
import com.project.backend.security.JwtUtil;
import com.project.backend.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
public class AuthController {
	


	@Autowired
	private UserService userService;

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

	
	@Autowired
	private ModelMapper modelMapper;



    public AuthController(AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );

            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            System.out.println("Authenticated user: " + userDetails.getUsername());
            
            JwtResponse response= new JwtResponse();
            response.setJwt(jwt);
            response.setUser(this.modelMapper.map((User)userDetails, UserDto.class));
 
            
            return new ResponseEntity<JwtResponse>(response,HttpStatus.OK);
//            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
        } catch (BadCredentialsException e) {
            // Handle the case where the authentication fails
           
        	throw new Exception("Invalid Username or Password !! ");
        }
    }
    
    //Register new user api
    
    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto){
    	
    	UserDto registerNewUser = this.userService.registerNewUser(userDto);
    	
    	return new ResponseEntity<UserDto>(registerNewUser,HttpStatus.CREATED);
    }
}
