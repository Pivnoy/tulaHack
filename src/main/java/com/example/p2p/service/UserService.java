package com.example.p2p.service;

import com.example.p2p.entity.User;
import com.example.p2p.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getUserByLogin(String login) {
        return userRepository.existsByLogin(login) ? userRepository.getByLogin(login).toString() : "";
    }
}
