package com.fisvc1.Spendwise.service;

import com.fisvc1.Spendwise.dto.AuthResponse;
import com.fisvc1.Spendwise.exception.InvalidUserException;
import com.fisvc1.Spendwise.exception.ResourceNotFoundException;
import com.fisvc1.Spendwise.model.User;
import com.fisvc1.Spendwise.repository.UserRepository;
import com.fisvc1.Spendwise.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtilService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserRepository userRepository, JwtUtil jwtUtilService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtilService = jwtUtilService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(User userDetails){
        if (userRepository.findByEmail(userDetails.getEmail()) != null) {
            throw new InvalidUserException("Email already in use");
        }
        if(userDetails.getEmail() == null || userDetails.getEmail().isEmpty()){
            throw new InvalidUserException("Email cannot be empty");
        }
        if(userDetails.getPassword() == null || userDetails.getPassword().isEmpty()){
            throw new InvalidUserException("Password cannot be empty");
        }
        if(userDetails.getName() == null || userDetails.getName().isEmpty()){
            throw new InvalidUserException("Name cannot be empty");
        }

        if(userDetails.getPassword().length() < 8){
            throw new InvalidUserException("Password must be at least 8 characters long");
        }
        userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        userRepository.save(userDetails);
        var token = jwtUtilService.generateToken(userDetails.getEmail());

        AuthResponse authenticationResponse = new AuthResponse();
        authenticationResponse.setJwt(token);
        authenticationResponse.setUserId(userDetails.getId());
        return authenticationResponse;
    }
    public AuthResponse authenticate(String email,String password){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            User user = userRepository.findByEmail(email);
            var token = jwtUtilService.generateToken(email);
            AuthResponse authenticationResponse = new AuthResponse();
            authenticationResponse.setJwt(token);
            authenticationResponse.setUserId(user.getId());
            authenticationResponse.setName(user.getName());
            return authenticationResponse;
        }catch (AuthenticationException e){
            throw new InvalidUserException("Invalid email or password");
        }
    }

}

