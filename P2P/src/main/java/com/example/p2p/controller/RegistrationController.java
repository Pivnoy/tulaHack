package com.example.p2p.controller;

import com.example.p2p.service.UserService;
import org.json.JSONObject;
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
    public ResponseEntity<String> registration(@RequestParam(name = "login") String login,
                                               @RequestParam(name = "password") String password){
        System.out.println("reg: " + login + " " + password);

        if (userService.existsByLogin(login))
            return ResponseEntity.ok((new JSONObject()).put("status", "fail").put("message", "Login already exists").toString());
        if (password.length() < 8)
            return ResponseEntity.ok((new JSONObject()).put("status", "fail").put("message", "Password is less than 8 characters").toString());

        userService.addNewUser(login, String.valueOf(password.hashCode()));
        return ResponseEntity.ok((new JSONObject()).put("status", "ok").toString());
    }

    @GetMapping("/check_login")
    @CrossOrigin
    @ResponseBody
    public ResponseEntity<String> checkLogin(@RequestParam(name = "login") String login) {
        System.out.println("check log: " + login);

        if (userService.existsByLogin(login))
            return ResponseEntity.ok((new JSONObject()).put("status", "fail").put("message", "Login already exists").toString());
        return ResponseEntity.ok((new JSONObject()).put("status", "ok").toString());
    }
}
