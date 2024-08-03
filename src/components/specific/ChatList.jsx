import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "1",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;

        const newMessagesAlert = newMessageAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = members?.some((some) => onlineUsers.includes(_id));

        return (
          <ChatItem
            key={_id}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            isOnline={isOnline}
            newMessageAlert={newMessagesAlert}
            index={index}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
