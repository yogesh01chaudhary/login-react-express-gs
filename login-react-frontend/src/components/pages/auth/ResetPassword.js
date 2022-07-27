import React from "react";
import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    };
    console.log(actualData);
    if (actualData.password && actualData.password_confirmation) {
      if (actualData.password === actualData.password_confirmation) {
        console.log(actualData);
        document.getElementById("password-reset-form").reset();
        setError({
          status: true,
          msg: "Password Reset Successfully. Redirecting to Login page",
          type: "success",
        });
        // navigate("/login");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError({
          status: true,
          msg: "password and confirm password doesn't match",
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "Please provide all fields",
        type: "error",
      });
    }
  };
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <h1>Reset Password</h1>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="password-reset-form"
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
            ></TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              name="password_confirmation"
              label="Confirm Password"
              type="password"
            ></TextField>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Save
              </Button>
            </Box>
            {error.status ? (
              <Alert severity={error.type}>{error.msg}</Alert>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPassword;
