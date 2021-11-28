import React, { useCallback } from "react";
import { IClassNameProps } from "@bem-react/core";
import { cn } from "@bem-react/classname";
import { message } from "../ChatSlice";
import { Text } from "../../../components/Text/Text";
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { useAppSelector } from "../../../hooks/hooks";

import './Message.scss';

interface MessageProps extends IClassNameProps {
    toWhom: string;
    content: message;
    preview?: boolean;
    onClick?: () => void;
}

const cnMessage = cn('Message');

export const Message: React.FC<MessageProps> = (props) => {
    const { content, preview = false, toWhom, onClick } = props;
    const { login } = useAppSelector(state => state.base);

    const formatName = (toWhom: string) => {
        if (!toWhom.includes(' ')) {
            return toWhom.slice(0,2).split('').join(' ');
        }
        return toWhom

    }

    const renderMessage = useCallback(() => {
        if (!toWhom) {
            return;
        }
        
        if (preview) {
            return (
                <div className={cnMessage({preview})} >
                    <InitialsAvatar  name={formatName(toWhom)} />
                    <div onClick={() => onClick && onClick()} className={cnMessage('Author', {preview})}>
                        <Text m>{toWhom}</Text>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text s>{content?.content}</Text>
                            <Text s>{new Date(content?.timeStamp).toLocaleTimeString("en-US")}</Text>
                        </div>
                    </div>
                </div>
            )
        }
        const leftOrWrite = (who: string) => {
            return who === login ? 'right' : 'left';
        }

        return (
            <div className={cnMessage({position: leftOrWrite(content.from)})}>
                <Text m>{content.from}</Text>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Text s>{content.content}</Text>
                    <Text s>{new Date(content.timeStamp).toLocaleTimeString("en-US")}</Text>
                </div>
            </div>
        )
    }, [preview, toWhom, onClick, login, content]);

    return (
        <div>
            {renderMessage()}
        </div>
    )
}