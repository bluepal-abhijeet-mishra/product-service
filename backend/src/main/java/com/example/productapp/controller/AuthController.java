package com.example.productapp.controller;

import com.example.productapp.config.JwtUtil;
import com.example.productapp.dto.AuthRequest;
import com.example.productapp.dto.AuthResponse;
import com.example.productapp.dto.MessageResponse;
import com.example.productapp.dto.RegisterRequest;
import com.example.productapp.exception.DuplicateResourceException;
import com.example.productapp.model.User;
import com.example.productapp.repository.UserRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> createAuthenticationToken(@Valid @RequestBody AuthRequest authRequest) {
        logger.info("Login attempt for user: {}", authRequest.getUsername());
        
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        final String token = jwtUtil.generateToken(userDetails);
        
        logger.info("User {} logged in successfully", authRequest.getUsername());
        
        AuthResponse response = new AuthResponse(token, authRequest.getUsername(), "Login successful");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        logger.info("Registration attempt for user: {}", registerRequest.getUsername());
        
        // Check if username already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            logger.warn("Registration failed: Username {} already exists", registerRequest.getUsername());
            throw new DuplicateResourceException("Username already exists");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        
        userRepository.save(user);
        
        logger.info("User {} registered successfully", registerRequest.getUsername());
        
        MessageResponse response = new MessageResponse("User registered successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
