import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';

import './Chat.scss';

const cnChat = cn('Chat');
const chatCn = cnChat();
const chatHeaderCn = cnChat('Header');
const chatBodyCn = cnChat('Body');
const chatMessageCn = cnChat('Message');


export const Chat = () => {

    const renderChatHeader = useCallback(() => {
        return (
            <div className={chatHeaderCn}>

            </div>
        )
    }, []);

    const renderChatBody = useCallback(() => {
        return (
            <div className={chatBodyCn}>

            </div>
        )
    }, [])

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