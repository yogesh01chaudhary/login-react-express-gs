import { TextField, Button, Box, Alert } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
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
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(actualData);
    if (actualData.email && actualData.password) {
      console.log(actualData, "Login Successful");
      document.getElementById("login-form").reset();
      setError({ status: true, msg: "Login Success", type: "success" });
      navigate("/dashboard");
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  return (
    <div>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
        ></TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
        ></TextField>
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        <NavLink to="/sendpasswordresetemail" variant="h5">
          Forgot Password
        </NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </div>
  );
};

export default Login;
