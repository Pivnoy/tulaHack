import React, { useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@mui/material';
import { Text } from '../../components/Text/Text';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import ForwardIcon from '@mui/icons-material/Forward';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { Dialog } from './Dialog/Dialog';
import { TextField } from '@mui/material';

import './Chat.scss';
import { setPickedChat } from './ChatSlice';

const cnChat = cn('Chat');
const chatCn = cnChat();
const chatHeaderCn = cnChat('Header');
const chatBodyCn = cnChat('Body');
const chatMessageCn = cnChat('Message');

const fontColor = {style: {color: 'white', backgroundColor: '#352b4a'}};

export const Chat = () => {
    const [conversationMode, setConversationMode] = useState(false);
    const { pickedChat } = useAppSelector(state => state.chats);

    const [messageToSend, setMessageToSend] = useState('');

    const { chats } = useAppSelector(state => state.chats);

    const dispatch = useAppDispatch();

    const tryToTalk = () => {

    }

    const renderChatHeader = useCallback(() => {
        if (conversationMode) {
            return (
                <div className={cnChat('Header', {conversationMode})}>
                    <Button onClick={() => setConversationMode(false)} variant="outlined" startIcon={<ArrowBackIosIcon />} />
                </div>
            )
        }
        return (
            <div className={cnChat('Header', {conversationMode: conversationMode ? 'list' : 'dialog'})}>
                <TextField
                    fullWidth
                    label="Talk to"
                    inputProps={fontColor}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    variant="filled"
                    color="info"
                    focused 
                />
                <Button style={{marginLeft: '10px'}} onClick={tryToTalk} variant="outlined" startIcon={<ConnectWithoutContactIcon />} />
            </div>
        )
        
    }, [conversationMode]);

    const renderChatBody = useCallback(() => {
        if (!chats) {
            return (
                <Text>У вас нет сообщений</Text>
            )
        }
        console.log(chats);


        const sortedChats = chats;
        console.log(chats);
        
        const onDialogClick = (i: number) => {
            setConversationMode(true);
            dispatch(setPickedChat(i));
        }

        return (
            <div className={chatBodyCn}>
                { conversationMode ? <Dialog conversationMode={conversationMode} onClick={() => {}} _id={pickedChat} dialog={sortedChats[pickedChat]} /> : 
                sortedChats.map((el, i) => <Dialog conversationMode={conversationMode} onClick={onDialogClick} _id={i} dialog={el} />)}
            </div>
        )
    }, [chats, conversationMode, dispatch, pickedChat])

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
                <Button style={{marginLeft: '5px'}} variant="outlined" startIcon={<ForwardIcon /> }/>
            </div>
        )
    }, [])

    return (
        <div className={chatCn}>
            {renderChatHeader()}
            {renderChatBody()}
            {conversationMode && renderChatMessage()}
        </div>
    )
}