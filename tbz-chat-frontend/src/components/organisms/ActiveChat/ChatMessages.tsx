import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getSelectedChatMessages } from "../../../redux/message/messageSelectors";
import useLanguage from "../../../util/hooks/useLanguage";
import Center from "../../atoms/Center";
import Message from "./Message";
import MessagePrompt from "./MessagePrompt";

type ChatMessagesProps = {
    className?: string;
};

const ChatMessages = (props: ChatMessagesProps) => {
    const { className } = props;
    const messages = useSelector(getSelectedChatMessages);
    const getString = useLanguage();

    if (!messages)
        return (
            <Center>
                <Typography>{getString("no.messages")}</Typography>
            </Center>
        );
    else
        return (
            <Box display="flex" flexDirection="column" className={className}>
                <Box py={2} px={6} width={1} flexGrow={1} maxHeight="calc(100% - 80px)" overflow="auto">
                    {messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))}
                </Box>
                <Box clone height={80}>
                    <MessagePrompt />
                </Box>
            </Box>
        );
};

export default ChatMessages;
