/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/auth.context"

const sign_in = () => {
  const [user, setUser] = useState({
    Username: "",
    Password: "",
  });
  const navigate = useNavigate();
  console.log(useAuthContext);
  const {login} = useAuthContext();
  const [error, setError] = useState(false);
  const handelChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClear = () => {
    setUser({
      Username: "",
      Password: "",
    });
    setError(false);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await AuthService.login(user.Username,user.Password)
      console.log(currentUser);
      login(currentUser)
      navigate("/");
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
          <h5 className="card-header"> Sign In </h5>
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
                <label htmlFor="name"> Password </label>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  onChange={handelChange}
                  value={user.Password}
                />
                <button
                  type="button"
                  className="btn btn-success m-3"
                  onClick={handleClick}
                >
                  sign in
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

export default sign_in;
