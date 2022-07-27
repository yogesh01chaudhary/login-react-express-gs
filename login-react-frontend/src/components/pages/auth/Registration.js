import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Registration = () => {
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
      name: data.get("name"),
      password_confirmation: data.get("password_confirmation"),
      tc: data.get("tc"),
    };

    console.log("Data Added", actualData);

    if (
      actualData.name &&
      actualData.email &&
      actualData.password &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.password_confirmation) {
        console.log("Registration Successful", actualData);
        document.getElementById("registration-form").reset();
        setError({
          status: true,
          msg: "Registration Successful",
          type: "success",
        });
        navigate("/dashboard");
      } else {
        console.log("password and confirm password not match");
        setError({
          status: true,
          msg: "Password and Confirm Password are not same",
          type: "error",
        });
      }
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
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          name="name"
          label="Name"
        ></TextField>
        <TextField
          margin="normal"
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          label="Confirm Password"
          type="password"
        ></TextField>
        <FormControlLabel
          control={<Checkbox value="agree" color="primary" name="tc" id="tc" />}
          label="I agree to terms and conditions."
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Join
          </Button>
        </Box>

        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
      </Box>
    </div>
  );
};

export default Registration;
