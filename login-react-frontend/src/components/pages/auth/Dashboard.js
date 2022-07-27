import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import ChangePassword from "./ChangePassword";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("LogOut Clicked");
    navigate("/login");
  };
  return (
    <div>
      <CssBaseline />
      <Grid container>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>Dashboard</h1>
          <Typography variant="h5">Email: vandana@gmail.com</Typography>
          <Typography variant="h6">Name: Vandana</Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            LogOut
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
