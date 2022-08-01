import { TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoginUserMutation } from "../../../services/userAuthApi";
import { storeToken, getToken } from "../../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../features/authSlice.js";
const Login = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email".toLowerCase()),
      password: data.get("password"),
    };
    // console.log(actualData);
    if (actualData.email && actualData.password) {
      const res = await loginUser(actualData);
      console.log(res);
      // console.log(actualData, "Login Successful");
      // document.getElementById("login-form").reset();
      // setError({ status: true, msg: "Login Success", type: "success" });
      if (res.data.status === "success") {
        // token store karna hai
        storeToken(res.data.token);
        console.log(res.data.token);
        navigate("/dashboard");
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: "error" });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  let token = getToken();
  console.log({ token: token });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserToken({ token: token }));
  }, [token, dispatch]);
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
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Login
            </Button>
          )}
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
