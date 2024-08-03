import React, { memo } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { sampleNotifications } from "../../constants/sampleData";

const Notifications = () => {
  const friendRequestHandler = ({ _id, accept }) => {};

  return (
    <Dialog
      open
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={{ xs: "25rem", sm: "50rem" }}
      >
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>

        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => (
            <NotificationItem
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
              key={i._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Notifications!</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, occupation, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />

        <Tooltip title={name}>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {`${name} (${occupation}) Sent You a Chat Request!`}
          </Typography>
        </Tooltip>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button
            color="success"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
