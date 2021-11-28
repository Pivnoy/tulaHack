import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@mui/material';
import { Text } from '../../components/Text/Text';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ForwardIcon from '@mui/icons-material/Forward';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Dialog } from './Dialog/Dialog';
import { TextField } from '@mui/material';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { baseUrl } from '../../utils/urls';
import { setPickedChat, addEmptyChat, setConversationMode, setCurrentClient } from './ChatSlice';
import axios from 'axios';
import { useShowAlertMessage } from '../../hooks/hooks';
import { store } from '../../store/store';
import { encryptMsg, decryptMsg } from '../../utils/rsaModule';

import './Chat.scss';

const cnChat = cn('Chat');
const chatCn = cnChat();
const chatBodyCn = cnChat('Body');
const chatMessageCn = cnChat('Message');

const fontColor = {style: {color: 'white', backgroundColor: '#352b4a'}};

export const Chat = () => {
    const { pickedChat } = useAppSelector(state => state.chats);
    const [stompClient, setStompClient] = useState<Stomp.Client>();
    const [messageToSend, setMessageToSend] = useState('');
    const [whomLogin, setWhomLogin] = useState('');
    const { currentClient } = useAppSelector(state => state.chats);

    const showAlertMesage = useShowAlertMessage();
    const { chats, conversationMode } = useAppSelector(state => state.chats);
    const { login } = useAppSelector(state => state.base);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let stmClient: Stomp.Client;
        function connect() {
        //@ts-ignore
        let socket = new SockJS(`${baseUrl}gs-guide-websocket`);
        stmClient = Stomp.over(socket);
        setStompClient(stmClient)
        stmClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stmClient.subscribe(`${baseUrl}receive/${login}`, function (greeting) {
                console.log(greeting);
            });
        });
        }
        connect()
    }, [login])

    const tryToTalk = useCallback(() => {
        axios(`${baseUrl}status`, { params: { login: whomLogin }})
        .then(response => {
            if (response.data.status === 'ok') {
                dispatch(setCurrentClient({ login: whomLogin, publickKey: response.data.pubKey }));
                if (chats) {
                    const chatIndex = chats.findIndex(chat => chat.login === currentClient?.login);
                    if (chatIndex >= 0) {
                        dispatch(setPickedChat(chatIndex));
                    } else {
                        dispatch(addEmptyChat({currentClient, pulicKey: response.data.pubKey}));
                    }
                } else {
                    //проверь, тут было undefined, из-за этого спавнятся чаты;
                    console.log('currentClient',currentClient);
                    const state = store.getState();
                    dispatch(addEmptyChat(state.chats.currentClient));
                }
                dispatch(setConversationMode(true))
                dispatch(setPickedChat(chats ? chats?.length : 0));
            } else {
                showAlertMesage(response.data.message);
            }
        })
    }, [chats, dispatch, showAlertMesage, currentClient, whomLogin]);

    const renderChatHeader = useCallback(() => {
        if (conversationMode) {
            return (
                <div className={cnChat('Header', {conversationMode})}>
                    <Button onClick={() => dispatch(setConversationMode(false))} variant="outlined" startIcon={<ArrowBackIosIcon />} />
                </div>
            )
        }
        return (
            <div className={cnChat('Header', {conversationMode: conversationMode ? 'list' : 'dialog'})}>
                <TextField

                    fullWidth
                    label="Talk to"
                    inputProps={fontColor}
                    onChange={(e) => setWhomLogin(e.target.value)}
                    variant="filled"
                    color="info"
                    focused 
                />
                <Button style={{marginLeft: '10px'}} onClick={tryToTalk} variant="outlined" startIcon={<ConnectWithoutContactIcon />} />
            </div>
        )
        
    }, [conversationMode, tryToTalk, dispatch]);

    const renderChatBody = useCallback(() => {
        if (!chats) {
            return (
                <Text>У вас нет сообщений</Text>
            )
        }
            
        const sortedChats = chats;
        
        const onDialogClick = (i: number) => {
            setConversationMode(true);
            dispatch(setPickedChat(i));
            dispatch(setConversationMode(true));
        }

        return (
            <div className={chatBodyCn}>
                { conversationMode ? <Dialog conversationMode={conversationMode} onClick={() => {}} _id={pickedChat} dialog={sortedChats[pickedChat]} /> : 
                sortedChats.map((el, i) => <Dialog conversationMode={conversationMode} key={i} onClick={onDialogClick} _id={i} dialog={el} />)}
            </div>
        )
    }, [chats, conversationMode, dispatch, pickedChat])

    const sendMessage = useCallback(() => {

        if (!currentClient || messageToSend.length < 1) {
            return;
        }
        console.log('stompSend', stompClient?.send, 'sender', login, 'reciever', currentClient.login);
        //@ts-ignore
        encryptMsg(messageToSend, JSON.parse(localStorage.getItem('publicKey')))
        .then(encMsg => {
            stompClient?.send(`${baseUrl}app/chat`, {}, JSON.stringify({data: encMsg, sender: login, receiver: currentClient.login}));
        });
    }, [currentClient, login, messageToSend, stompClient])

    const renderChatMessage = useCallback(() => {
        

        return (
            <div className={chatMessageCn}>
                <TextField
                    fullWidth
                    label="Type here"
                    inputProps={fontColor}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    variant="filled"
                    color="info"
                    focused 
                />
                <Button onClick={sendMessage} style={{marginLeft: '5px'}} variant="outlined" startIcon={<ForwardIcon /> }/>
            </div>
        )
    }, [sendMessage])

    return (
        <div className={chatCn}>
            {renderChatHeader()}
            {renderChatBody()}
            {conversationMode && renderChatMessage()}
        </div>
    )
}