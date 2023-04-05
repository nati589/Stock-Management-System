import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/system";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Logout } from "@mui/icons-material";

const MyLink = styled(NavLink)(({ theme }) => ({
  // color: 'primary',
  textDecoration: "none",
}));

function AdminNavBar({ logout, mode }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" color="primary" sx={{ mb: 5 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          noWrap
          fontWeight="bold"
          component="div"
          color=""
          sx={{ display: { xs: "none", sm: "block" } }}>
          StockUp
        </Typography>
        <Box>
          <Stack direction="row" spacing={3}>
            <MyLink to="/admin/">
              <Button sx={{ color: '#fff'}}>Sales</Button>
            </MyLink>
            <MyLink to="/admin/stock">
              <Button sx={{ color: '#fff'}}>Stock</Button>
            </MyLink>
            <MyLink to="/admin/creditreport">
              <Button sx={{ color: '#fff'}}>Credit</Button>
            </MyLink>
            <MyLink to="/admin/expensereport">
              <Button sx={{ color: '#fff'}}>Expense</Button>
            </MyLink>
            <MyLink to="/admin/adduser">
              <Button sx={{ color: '#fff'}}>New User</Button>
            </MyLink>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}>
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem
          onClick={() => {
            handleClose();
            mode();
          }}>
          <ListItemIcon>
            <NightlightIcon fontSize="small" />
          </ListItemIcon>
          Theme
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            localStorage.clear();
            navigate("/login");
          }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default AdminNavBar;
