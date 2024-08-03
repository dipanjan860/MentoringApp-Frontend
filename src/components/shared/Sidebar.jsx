import React from "react";
import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { TabLink } from "../styles/StyledComponents";

export const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Groups",
    path: "/admin/groups",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {};

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        TextVista
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <TabLink
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "#504c4c",
                color: "white",
                "&:hover": {
                  bgcolor: "#504c4c",
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
            </Stack>
          </TabLink>
        ))}

        <TabLink onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography fontSize={"1.2rem"}>Logout</Typography>
          </Stack>
        </TabLink>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
