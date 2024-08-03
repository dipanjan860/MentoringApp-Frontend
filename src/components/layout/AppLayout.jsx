import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    return (
      <div>
        <Title title={"Mentoring App"} />

        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            md={3}
            sm={4}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={9} lg={9} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
