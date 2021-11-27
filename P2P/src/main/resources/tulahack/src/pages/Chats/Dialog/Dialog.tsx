import React, { useCallback } from 'react';
import { IClassNameProps } from '@bem-react/core';
import { dialog } from '../ChatSlice';
import { Message } from '../Message/Message';
import type { message } from '../ChatSlice';

interface DialogProps extends IClassNameProps {
    big?: boolean,
    dialog: dialog
}

export const Dialog: React.FC<DialogProps> = (props) => {
    const { big = false, dialog} = props;

    const renderFull = useCallback(() => {
        const sortedMessages = dialog.conversation.sort((a, b) => a.timeStamp - b.timeStamp)
        return (
            <div>
                {sortedMessages.map(el => <Message content={el} />)}
            </div>
        )
    }, [dialog.conversation])

    const renderFirst = useCallback(() => {
        const lastMessage = dialog.conversation.find(el => el.timeStamp === dialog.lastMessageTime) as message;

        return (
            <Message content={lastMessage}/>        
        )
    }, [dialog])

    const renderDialog = useCallback(() => {
        return big ? renderFull() : renderFirst();
    }, [big, renderFirst, renderFull]);

    return (
        <div>
            {renderDialog()}
        </div>
    )
}