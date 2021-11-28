package com.example.p2p.controller;

import com.example.p2p.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RegistrationController {
    private UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/registration")
    @CrossOrigin
    @ResponseBody
    public ResponseEntity<Boolean> registration(@RequestParam(name = "login") String login,
                                                  @RequestParam(name = "password") String password){
        System.out.println("reg: " + login +" "+ password);
        if (userService.existsByLogin(login) || password.length()<8)
            return ResponseEntity.ok(Boolean.FALSE);
        userService.addNewUser(login, String.valueOf(password.hashCode()));
        return ResponseEntity.ok(Boolean.TRUE);
    }

    @GetMapping("/check_login")
    @CrossOrigin
    @ResponseBody
    public ResponseEntity<Boolean> checkLogin(@RequestParam(name = "login") String login) {
        System.out.println("check log: " + login);
        return ResponseEntity.ok(userService.existsByLogin(login));
    }
}
