package com.example.p2p.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import sun.security.rsa.RSAUtil;

import javax.crypto.Cipher;
import java.security.*;

@Service
@Getter
@Setter
@NoArgsConstructor
public class RsaService {
    public static final String ALGORITHM = "RSA";
    private PrivateKey privateKey;
    private PublicKey publicKey;

    public void generateKeys() throws NoSuchAlgorithmException {
        final KeyPairGenerator keyGen = KeyPairGenerator.getInstance(ALGORITHM);
        keyGen.initialize(2048);
        final KeyPair key = keyGen.generateKeyPair();
        privateKey = key.getPrivate();
        publicKey = key.getPublic();
    }

    /**
     * Encrypt the plain text using public key.
     *
     * @param message : original plain text
     * @param key     :The public key
     * @return Encrypted text, as bytes[]
     * @throws java.lang.Exception
     */
    public byte[] encryptMessageWithPublicKey(String message, PublicKey key) {
        byte[] cipherText = null;
        try {
            final Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            cipherText = cipher.doFinal(message.getBytes());
        } catch (Exception e) {
            //TODO handle exception
            e.printStackTrace();
        }
        return cipherText;
    }

    /**
     * Decrypt text using private key.
     *
     * @param message :encrypted text
     * @param key     :The private key
     * @return plain text, as string
     * @throws java.lang.Exception
     */
    public String decryptMessageWithPrivateKey(byte[] message, PrivateKey key) {
        byte[] dectyptedText = null;
        try {
            final Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            dectyptedText = cipher.doFinal(message);

        } catch (Exception ex) {
            //TODO handle exception
            ex.printStackTrace();
        }
        return new String(dectyptedText);
    }

}

