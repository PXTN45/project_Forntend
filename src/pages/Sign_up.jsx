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

export default function sign_up() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ message: "" });
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
});

  
  const handelChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClear = () => {
    setUser({
      Username: "",
      Email: "",
      Password: "",
      Confirm_Password: "",
    });
    // setError(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (user.Confirm_Password === user.Password) {
        const register = await AuthService.register(
          user.Username,
          user.Email,
          user.Password
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
    <div className="container">
      <h1>Grab Restaurant</h1>
      <div className="row form">
        <div className="col-6 card justify-content-center">
          <h5 className="card-header"> Sign Up </h5>
          <div className="error">{error && errorMessage.message}</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name"> Username </label>
                <input
                  type="text"
                  className="form-control"
                  name="Username"
                  placeholder="Username"
                  onChange={handelChange}
                  value={user.Username}
                />
                <label htmlFor="name"> Email </label>
                <input
                  type="text"
                  className="form-control"
                  name="Email"
                  placeholder="Email"
                  onChange={handelChange}
                  value={user.Email}
                />
                <label htmlFor="name"> Password </label>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  onChange={handelChange}
                  value={user.Password}
                />
                <label htmlFor="name"> Confirm Password </label>
                <input
                  type="password"
                  className="form-control"
                  name="Confirm_Password"
                  placeholder="Confirm_Password"
                  onChange={handelChange}
                  value={user.Confirm_Password}
                />
                <button
                  type="button"
                  className="btn btn-success m-3"
                  onClick={handleClick}
                >
                  sign up
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Sign_up;
