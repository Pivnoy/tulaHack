package com.example.p2p.controller;

import com.example.p2p.message.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class MessageController {
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessageController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    @CrossOrigin
    public void routeMessage(Message message) {
        System.out.println(message.toString());
        messagingTemplate.convertAndSend("/receive/" + message.getReceiver(), message);
    }
}
