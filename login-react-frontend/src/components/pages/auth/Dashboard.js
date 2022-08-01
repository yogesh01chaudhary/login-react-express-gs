import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import ChangePassword from "./ChangePassword";
import { removeToken, getToken } from "../../../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../../../services/userAuthApi.js";
import { useDispatch } from "react-redux";
import { setUserInfo, unSetUserInfo } from "../../../features/userSlice.js";
import { unSetUserToken } from "../../../features/authSlice.js";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("LogOut Clicked");
    dispatch(unSetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ token: null }));
    removeToken("token");
    navigate("/login");
  };
  const token = getToken();
  // console.log(token);
  const { data, isSuccess } = useGetLoggedUserQuery(token);
  // console.log(data);

  const [userData, setUserData] = useState({ email: "", name: "" });
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({ email: data.user.email, name: data.user.name });
    }
  }, [data, isSuccess]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({ email: data.user.email, name: data.user.name }));
    }
  }, [data, isSuccess, dispatch]);
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
          <Typography variant="h5">Email: {userData.email}</Typography>
          <Typography variant="h6">Name: {userData.name}</Typography>
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
