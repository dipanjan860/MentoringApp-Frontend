import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/specific/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const user = {
  _id: "1",
  name: "Dipanjan Das"
}

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"#f0f0f0"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {
          sampleMessage.map((msg) => (
            <MessageComponent key={msg._id} message={msg} user={user} />
          ))
        }
      </Stack>

      <form style={{ height: "10%" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here..." />

          <IconButton
            type="submit"
            sx={{
              rotate: "-45deg",
              bgcolor: "#525050",
              color: "white",
              marginLeft: "1rem",
              padding: "0.75rem",
              "&:hover": {
                bgcolor: "#403E3E",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
