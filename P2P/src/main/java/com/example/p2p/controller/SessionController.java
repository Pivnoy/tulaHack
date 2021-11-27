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

    // user is online,auth
    @GetMapping("/auth")
    @ResponseBody
    public ResponseEntity<Boolean> logUser(@RequestParam(name = "login") String login,
                                           @RequestParam(name = "password") String password,
                                           @RequestParam(name = "public_key") String public_key) {
        if (userService.existsByLogin(login)
                && userService.getUserByLogin(login).getPassword().equals(String.valueOf(password.hashCode()))) {
            SessionService.getSessionService().addUser(login, public_key);
            //
            //all work with w-sockets here
            //
            return ResponseEntity.ok(Boolean.TRUE);
        }
        return ResponseEntity.ok(Boolean.FALSE);
    }

    //check if user is online, get his public key for RSA
    @GetMapping("/status")
    @ResponseBody
    public ResponseEntity<String> getStatus(@RequestParam(name = "login") String login) {
        if (SessionService.getSessionService().checkUser(login)) {
            return ResponseEntity.ok(SessionService.getSessionService().getPublicKey(login));
        }
        return null;
    }

    //end session
    @GetMapping("/logout")
    public void logoutUser(@RequestParam(name = "login") String login) {
        //break connection with w-socket
        SessionService.getSessionService().deleteUser(login);
    }
}
