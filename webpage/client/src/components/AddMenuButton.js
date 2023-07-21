import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function AddMenuButton() {
  const dummyMenuItems = [
    {
      title: "Rich text",
      link: `/LoginHome/${uuidv4()}`,
    },
    {
      title: "Markdown",
      link: `/MarkDown/${uuidv4()}`,
    },
    {
      title: "Post it",
      link: "/PostIt",
    },
    {
      title: "LaTeX document",
      link: `/LaTex/${uuidv4()}`
    }
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nativeOnChange = e => {
    const detail = {
      selectedIndex: e.target.selectedIndex
    };
    e.target.selectedIndex = 0;

    e.target.dispatchEvent(new CustomEvent("itemClick", { detail }));
  };

  const itemClick = e => {
    console.log("Item Clicked " + e.detail);
  };
  return (
    <>

      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="Open to show more"
        title="Open to show more"
        sx={{
            color: '#FFFFFF', // Set the color to white
          }}
      >
        <AddIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dummyMenuItems.map(item => (
          <MenuItem onClick={handleClose}
          key={item.title}
          value={item.title}
          component={Link}
          to={item.link}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
