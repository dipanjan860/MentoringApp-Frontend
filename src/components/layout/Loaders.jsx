import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";

export const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        md={3}
        sm={4}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={"5rem"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        height={"100%"}
        sx={{
          padding: "1rem",
        }}
      >
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} height={"5rem"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          padding: "2rem",
          bgcolor: "#504C4C",
        }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};
