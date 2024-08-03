import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#504c4c" : "white",
        color: sameSender ? "white" : "black",
        borderRadius: "10px",
        padding: "0.75rem 1.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={"#2694ab"} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography
        color={sameSender ? "#f0f0f0" : "text.secondary"}
        variant="caption"
      >
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
