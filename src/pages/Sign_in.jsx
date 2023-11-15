import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

// MUI framework
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
import Swal from 'sweetalert2'

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

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  // const {login} = useAuthContext();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });


  const handelChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const current = await authService.login(
        user.username,
        user.password
      );
      authService.login(current);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successed",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const handleCancel = () => {
    navigate("/");
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
          <Typography component="h1" variant="h5" marginTop={10}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
              name="password"
              label="Password"
              onChange={handelChange}
              value={user.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
            <Grid container>
              <Grid item sm={12}>
                <Typography fontSize={15}>
                  Don't have an account?{" "}
                  <Link
                    to="/sign_up"
                    variant="body2"
                    style={{colors:"#ef6c00"}}
                    spacing={6}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
