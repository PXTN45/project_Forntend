import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Swal from 'sweetalert2'

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
const config = {
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
  // headers : authHeader(),
};

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

export default function Edit() {
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    img: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { restaurantId } = useParams();
  const handelChange = (e) => {
    setRestaurant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await axios.get(`${URL}/restaurant/${restaurantId}`);
        setRestaurant(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllRestaurants();
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/restaurant/${restaurantId}`, restaurant, config);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Update restaurant ${restaurantId} successed`,
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancel!",
          text: "Your cancel successed",
          icon: "success"
        });
        navigate("/");
      }
    });
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
            Edit Restaurant
          </Typography>
          {/* <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          > */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              onChange={handelChange}
              value={restaurant.name}
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="type"
              label="type"
              onChange={handelChange}
              value={restaurant.type}
              type="type"
              id="type"
              autoComplete="current-type"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="img"
              label="img"
              onChange={handelChange}
              value={restaurant.img}
              type="img"
              id="img"
              autoComplete="current-type"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Edit
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleCancel}
            >
              cancel
            </Button>
          {/* </Box> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// export default Edit
