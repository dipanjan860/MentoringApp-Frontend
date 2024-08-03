import React from "react";
import { Menu } from "@mui/material";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div style={{ width: "10rem" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem debitis
        sint, corrupti eum placeat ex suscipit temporibus provident quaerat rem.
      </div>
    </Menu>
  );
};

export default FileMenu;
