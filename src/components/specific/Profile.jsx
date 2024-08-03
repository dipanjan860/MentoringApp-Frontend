import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
      src="https://www.w3schools.com/howto/img_avatar.png"
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />

      <ProfileCard heading={"Bio"} text={"Hi, I am Dipanjan Das."} />

      <ProfileCard heading={"Username"} text={"dipanjandas"} Icon={<UsernameIcon />} />

      <ProfileCard heading={"Name"} text={"Dipanjan Das"} Icon={<FaceIcon />} />

      <ProfileCard heading={"Joined"} text={moment('2023-11-04T18:30:00.000Z').fromNow()} Icon={<CalenderIcon />} />
    </Stack>
  );
};

const ProfileCard = ({text, Icon, heading}) => <Stack direction={"row"} textAlign={"center"} alignItems={"center"} spacing={"1rem"} color={"white"}>
  {Icon && Icon}

  <Stack>
    <Typography variant="body1">{text}</Typography>
    
    <Typography color={"gray"} variant="caption">{heading}</Typography>
  </Stack>
</Stack>

export default Profile;
