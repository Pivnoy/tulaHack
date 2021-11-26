package com.example.p2p.controller;

import com.example.p2p.entity.User;
import com.example.p2p.service.SessionService;
import com.example.p2p.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.PublicKey;

@RestController
public class SessionController {

    private UserService userService;


    @Autowired
    public SessionController(UserService userService) {
        this.userService = userService;
    }

    //user is online
    @GetMapping("/log")
    public void logUser(@RequestParam(name = "login") String login) {
        SessionService.getSessionService().addUser(login,userService.getUserByLogin(login).getPublic_key());
    }

    @GetMapping("/status")
    @ResponseBody
    public ResponseEntity<String> getStatus(@RequestParam(name = "login") String login) {
        if (SessionService.getSessionService().checkUser(login)){
            return ResponseEntity.ok(SessionService.getSessionService().getPublicKey(login));
        }
        return null;
    }

    @GetMapping("/logout")
    public void logoutUser(@RequestParam(name = "login") String login) {
        SessionService.getSessionService().deleteUser(login);
    }

}
