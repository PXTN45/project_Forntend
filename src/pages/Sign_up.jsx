/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#ef6c00",
      dark: "#fb8c00",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function signUp() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ message: "" });

  const [user, setUser] = useState({
    username: "",
    Email: "",
    password: "",
    confirm_Password: "",
  });

  const handelChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (user.confirm_Password === user.password) {
        const register = await AuthService.register(
          user.username,
          user.Email,
          user.password
        );
      } else {
        setError(true);
        setErrorMessage({ message: "Failed Password mismatched !" });
      }

      navigate("/sign_in");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" marginTop={15}>
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleClick}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              onChange={handelChange}
              value={user.username}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email"
              onChange={handelChange}
              value={user.Email}
              name="Email"
              autoComplete="Email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              onChange={handelChange}
              value={user.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Confirm_Password"
              label="Confirm_Password"
              onChange={handelChange}
              value={user.confirm_Password}
              type="Confirm_Password"
              id="Confirm_Password"
              autoComplete="current-Confirm_Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mb: 2 }}
              onClick={handleCancel}
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// export default Sign_up;
