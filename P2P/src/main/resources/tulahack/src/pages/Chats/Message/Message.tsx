import React from "react";
import { IClassNameProps } from "@bem-react/core";
import { cn } from "@bem-react/classname";
import { message } from "../ChatSlice";
import { Text } from "../../../components/Text/Text";

interface MessageProps extends IClassNameProps {
    content: message;
}

export const Message: React.FC<MessageProps> = (props) => {
    const { content } = props;

    return (
        <div>
            <Text m>{content.content}</Text>
            <Text s>{new Date(content.timeStamp)}</Text>
        </div>
    )
}