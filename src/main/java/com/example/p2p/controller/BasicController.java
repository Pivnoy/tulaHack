package com.example.p2p.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicController {

    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<String> getBasicAnswer() {
        return ResponseEntity.ok("Vlados do svyazi..........");
    }

}
