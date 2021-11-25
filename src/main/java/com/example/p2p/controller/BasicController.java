package com.example.p2p.controller;


import com.example.p2p.entity.User;
import com.example.p2p.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicController {

    private UserService userService;


    @Autowired
    public BasicController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<String> getBasicAnswer(@RequestParam(name = "id") String id) {
        String result = userService.getUserById(Long.parseLong(id)).toString();
        return result == null ? ResponseEntity.ok("Govno") : ResponseEntity.ok(result);
    }

}
