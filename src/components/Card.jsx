/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/auth.context";

const Card = ({ restaurant, handleDelete }) => {
  const { user, logout } = useAuthContext();

  return (
    <div
      className="card"
      id="card"
      style={{ width: "18rem" }}
      key={restaurant.id}
    >
      <img src={restaurant.img} alt="" className="card-img-top" />
      <div className="card-body">
        <h5 className="title">{restaurant.name}</h5>
        <p className="card-text">{restaurant.type}</p>
        {user && user.roles && user.roles.includes("ROLES_ADMIN") && (
          <Link
            to=""
            id="delete"
            className="btn btn-danger px-2"
            onClick={() => {
              handleDelete(restaurant.id);
            }}
          >
            Delete
          </Link>
        )}
        {user && user.roles && user.roles.includes("ROLES_ADMIN") && (
          <Link to={`/edit/${restaurant.id}`} className="btn btn-warning px-2">
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
