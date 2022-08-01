import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../../../services/userAuthApi";
const SendPasswordResetEmail = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  // const navigate = useNavigate();
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };
    // console.log(actualData);
    if (actualData.email) {
      const res = await sendPasswordResetEmail(actualData);
      console.log(res);
      // console.log(actualData);
      if (res.data.status === "success") {
        document.getElementById("password-reset-email-form").reset();
        setError({
          status: true,
          msg: "Password Reset Email Sent",
          type: "success",
        });
        // navigate("/reset");
      }
      if (res.data.status === "failed") {
        setError({
          status: true,
          msg: res.data.message,
          type: "error",
        });
      }
    } else {
      setError({
        status: true,
        msg: "Please provide valid Email",
        type: "error",
      });
    }
  };
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="password-reset-email-form"
            onSubmit={handleSubmit}
          >
            <h1>Reset Password</h1>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
            ></TextField>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Reset Password
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

export default SendPasswordResetEmail;
