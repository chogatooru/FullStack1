import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link } from "react-router-dom";
import {
  AppBar,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Pets } from "@mui/icons-material";

interface NavbarProps {
  setMode: (mode: "light" | "dark") => void;
  mode: "light" | "dark";
}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar: React.FC<NavbarProps> = ({ setMode, mode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          PetPaw Diaries
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Hidden smDown>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "1rem",
              }}
            >
              Home
            </Link>
            <Link
              to="/blogposts"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "1rem",
              }}
            >
              View Posts
            </Link>
            <Link
              to="/blogposts/add"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "1rem",
              }}
            >
              Add New Post
            </Link>
            <IconButton>
              <Brightness4Icon />
              <Switch
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              />
            </IconButton>
          </div>
        </Hidden>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to="/blogposts"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View Posts
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              to="/blogposts/add"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Add New Post
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Brightness4Icon />
            <Switch
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            />
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
