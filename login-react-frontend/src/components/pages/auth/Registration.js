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
import { useRegisterUserMutation } from "../../../services/userAuthApi";
import { storeToken } from "../../../services/LocalStorageService";
const Registration = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email".toLowerCase()),
      password: data.get("password"),
      name: data.get("name"),
      password_confirmation: data.get("password_confirmation"),
      tc: data.get("tc"),
    };

    // console.log("Data Added", actualData);

    if (
      actualData.name &&
      actualData.email &&
      actualData.password &&
      actualData.tc !== null
    ) {
      if (actualData.password === actualData.password_confirmation) {
        const res = await registerUser(actualData);
        console.log(res);
        // console.log("Registration Successful", actualData);
        // document.getElementById("registration-form").reset();
        // setError({
        //   status: true,
        //   msg: "Registration Successful",
        //   type: "success",
        // });
        if (res.data.status === "success") {
          storeToken(res.data.token);
          console.log(res.data.token);
          navigate("/dashboard");
        }
        if (res.data.status === "failed") {
          setError({
            status: true,
            msg: res.data.message,
            type: "error",
          });
        }
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
          control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
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
