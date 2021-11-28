import React, { useCallback } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import { dialog } from '../ChatSlice';
import { Message } from '../Message/Message';
import type { message } from '../ChatSlice';
import { useAppSelector } from '../../../hooks/hooks';

import './Dialog.scss';

interface DialogProps extends IClassNameProps {
    onClick: (i: number) => void,
    conversationMode?: boolean,
    dialog: dialog,
    _id: number,
}

const cnDialog = cn('Dialog');
const dialogCn = cnDialog();

export const Dialog: React.FC<DialogProps> = (props) => {
    const { conversationMode = false, dialog, onClick, _id} = props;

    const renderFull = useCallback(() => {
        const sortedMessages = dialog?.conversation;
        return (
            <div>
                {sortedMessages?.map(el => <Message toWhom={dialog.login} content={el} />)}
            </div>
        )
    }, [dialog?.conversation, dialog?.login])

    const renderFirst = useCallback(() => {
        const lastMessage = dialog?.conversation?.find(el => el.timeStamp === dialog.lastMessageTime) as message;

        return (
            <Message onClick={() => onClick(_id)} toWhom={dialog.login} preview content={lastMessage}/>        
        )
    }, [dialog, _id, onClick])

    const renderDialog = useCallback(() => {
        return conversationMode ? renderFull() : renderFirst();
    }, [conversationMode, renderFirst, renderFull]);

    return (
        <div className={dialogCn}>
            {renderDialog()}
        </div>
    )
}