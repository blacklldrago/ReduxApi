import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { destroyToken } from "../utils/axiosRequest";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const settings = ["Profile", "Log out"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logoutModal, setLogoutModal] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    // destroyToken();
    // navigate("/")
  };
    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ color: "#111827" }}>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SR
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
              <Link to="/users">

                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Users</Typography>
                  </MenuItem>
              </Link>
              <Link to="/todo">

                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Todo</Typography>
                  </MenuItem>
              </Link>
              <Link to="/album">
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Album</Typography>
                  </MenuItem>
              </Link>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/users">
                <Button
                  key={"Users"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Users
                </Button>
              </Link>
              <Link to="/todo">
                <Button
                  key={"Todo"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Todo
                </Button>
              </Link>
              <Link to="/album">
                <Button
                  key={"Albums"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Albums
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  if (setting === "Log out") {
                    return (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          setLogoutModal(true);
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  }
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/profile");
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {logoutModal && (
        <Dialog
          open={() => setLogoutModal(true)}
          onClose={() => setLogoutModal(false)}
        >
          <DialogTitle variant="primary">Exit</DialogTitle>
          <DialogContent>
            Are you sure you want to exit from account?
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontWeight: 600 }}
              color="error"
              onClick={() => setLogoutModal(false)}
            >
              NO
            </Button>
            <Button
              sx={{ fontWeight: 600 }}
              color={"success"}
              onClick={() => {
                destroyToken();
                navigate("/");
              }}
            >
              YES
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Outlet />
    </div>
  );
}
export default ResponsiveAppBar;
