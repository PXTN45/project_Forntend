import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth.context";
import Swal from 'sweetalert2'

const Nevbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout",
          text: "Logout successed",
          icon: "success"
        });
        logout();
        navigate("/sign_in"); 
      }
    });
  };
  const linkStyle = {
    color: '#fff',
    fontSize: '25px',
  };
  console.log(user);

  return (
    <nav className="navbar navbar-expand-lg  " style={{ backgroundColor: "#ef6c00" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={linkStyle}>
          <b>Restaurant</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {user && user.roles && user.roles.includes("ROLES_ADMIN") && (
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link " style={{ color: "#fff" }} to="/add">
                Add
              </Link>
            </li>
          </ul>
        )}
        <div className="Signin">
          {!user && (

            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ color: "#fff" }}
                  aria-current="page"
                  to="/sign_in"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ color: "#fff" }}
                  aria-current="page"
                >
                  /
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link"
                  style={{ color: "#fff" }}
                  to="/sign_up"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
          {user && (
            <ul className="nav justify-content-end ">
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"} style={{ color: "#fff" }} >{user.username}</Link>
                <Link
                  className="nav-link"
                  style={{ color: "#fff" }}
                  to="/logout"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nevbar;
