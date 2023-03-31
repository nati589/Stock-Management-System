import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Stack } from "@mui/system";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const MyLink = styled(NavLink)(({ theme }) => ({
  // color: 'primary',
  textDecoration: "none",
}));

function AdminNavBar({ logout, mode }) {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="" sx={{ mb: 5 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          noWrap
          fontWeight="bold"
          component="div"
          color="primary"
          sx={{ display: { xs: "none", sm: "block" } }}>
          SELL'D
        </Typography>
        <Box>
          <Stack direction="row" spacing={3}>
            <Button onClick={mode}>
              <NightlightIcon />
            </Button>
            <MyLink to="/admin/">
              <Button>Sales</Button>
            </MyLink>
            <MyLink to="/admin/stock">
              <Button>Stock</Button>
            </MyLink>
            <MyLink to="/admin/creditreport">
              <Button>Credit</Button>
            </MyLink>
              <MyLink to="/admin/expensereport">
            <Button>
                Expense
            </Button>
                </MyLink>
            <Button onClick={() => {
                localStorage.clear();
                navigate("/login");
              }} variant="outlined">
              Log Out
            </Button>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavBar;
