package com.example.p2p.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.PrivateKey;
import java.security.PublicKey;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserData {
    private String login;
    private String password;
    private PublicKey public_key;
    private PrivateKey private_Key;
    private Boolean is_online;
}
