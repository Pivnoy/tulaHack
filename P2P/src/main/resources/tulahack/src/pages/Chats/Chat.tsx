import React, { useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Button } from '@mui/material';
import { Text } from '../../components/Text/Text';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppSelector } from '../../hooks/hooks';
import { Dialog } from './Dialog/Dialog';

import './Chat.scss';

const cnChat = cn('Chat');
const chatCn = cnChat();
const chatHeaderCn = cnChat('Header');
const chatBodyCn = cnChat('Body');
const chatMessageCn = cnChat('Message');


export const Chat = () => {
    const [chatMode, setChatMode] = useState(true);
    const { chats } = useAppSelector(state => state.chats);

    const renderChatHeader = useCallback(() => {
        return (
            <div className={chatHeaderCn}>
                {chatMode && <ArrowBackIosIcon />}
            </div>
        )
    }, [chatMode]);

    const renderChatBody = useCallback(() => {
        if (!chats) {
            return (
                <Text>У вас нет сообщений</Text>
            )
        }
        console.log(chats);

        // const sortedChats = chats.sort((a, b) => a.lastMessageTime - b.lastMessageTime);
        const sortedChats = chats;
        console.log(chats);
        
        return (
            <div className={chatBodyCn}>
                {sortedChats.map(el => <Dialog dialog={el} />)}
            </div>
        )
    }, [chats])

    const renderChatMessage = useCallback(() => {
        

        return (
            <div className={chatMessageCn}>
                
            </div>
        )
    }, [])

    return (
        <div className={chatCn}>
            {renderChatHeader()}
            {renderChatBody()}
            {renderChatMessage()}
        </div>
    )
}