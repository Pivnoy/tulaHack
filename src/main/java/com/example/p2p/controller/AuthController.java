package com.example.p2p.controller;

import com.example.p2p.controller.dto.UserData;
import com.example.p2p.repository.UserRepository;
import com.example.p2p.service.RsaService;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.NoSuchAlgorithmException;

public class AuthController {

    private UserRepository userRepository;
    private RsaService rsaService;

    @Autowired
    public AuthController(UserRepository userRepository, RsaService rsaService) {
        this.userRepository = userRepository;
        this.rsaService = rsaService;
    }

    public UserData loginUser(String password, String login) throws NoSuchAlgorithmException {
        rsaService.generateKeys();
        UserData userData = new UserData(login,password,
                rsaService.getPublicKey(),
                rsaService.getPrivateKey(),
                true);
        //TODO where we get private key?
        userRepository.logUser(userData.getLogin(),
                userData.getPassword(),
                userData.getPublic_key().toString(),
                userData.getIs_online());
        return userData;
    }
}
