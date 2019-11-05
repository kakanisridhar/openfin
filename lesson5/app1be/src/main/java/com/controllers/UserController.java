package com.controllers;

import com.config.security.CurrentUser;
import com.config.security.JwtOutils;
import com.config.security.MyBCryptPasswordEncoder;
import com.payload.AuthRequest;
import com.payload.AuthResponse;
import com.models.User;
import com.payload.UserSummary;
import com.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class UserController {

    private com.repositories.UserRepository UserRepository;
    private MyBCryptPasswordEncoder myBCryptPasswordEncoder;
    @Autowired
    private com.repositories.UserRepository userRepository;
    @Autowired
    private JwtOutils jwtOutils;

    public UserController(UserRepository UserRepository,
                          MyBCryptPasswordEncoder myBCryptPasswordEncoder) {
        this.UserRepository = UserRepository;
        this.myBCryptPasswordEncoder = myBCryptPasswordEncoder;
    }

    @PostMapping("/sign-in")
    public AuthResponse signIn(@RequestBody AuthRequest authRequest) {
        User user = userRepository.findByUsername(authRequest.username);
        if (user != null && myBCryptPasswordEncoder.matches(authRequest.password, user.getPassword())) {
            return new AuthResponse(jwtOutils.create(user));
        }
        return null;
    }

    @GetMapping("/user/me")
    @Secured({ "ROLE_USER", "ROLE_ADMIN" })
    public UserSummary getCurrentUser(Authentication authentication) {
        if(authentication!=null) {
            UserSummary userSummary = new UserSummary(authentication.getName());
            return userSummary;
        }
        return null;
    }

}
