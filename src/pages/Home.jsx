import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"#f0f0f0"} height={"100%"}>
    <Typography p={"2rem"} variant="h5" textAlign={"center"}>
      Select a chat
    </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
