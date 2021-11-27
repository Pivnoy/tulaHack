package com.example.p2p.controller;

import com.example.p2p.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {
    private UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/registration")
    @ResponseBody
    public ResponseEntity<Boolean> registration(@RequestParam(name = "login") String login,
                                                  @RequestParam(name = "password") String password){
        if (userService.existsByLogin(login) || password.length()<8)
            return ResponseEntity.ok(Boolean.FALSE);
        userService.addNewUser(login, String.valueOf(password.hashCode()));
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
