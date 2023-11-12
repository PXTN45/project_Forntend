import { useAuthContext } from "../context/auth.context";

export const Profile = () => {
  const { user } = useAuthContext();
  return (
    <div className="container" id="profile">
      <div className="row">
        <div
          className="card profile my-2 light" 
          style={{ width: "500px", borderRadius: "10px" }}
        >
          <div className="card-header"style={{ backgroundColor: "#ef6c00" }}> Profile </div>
          <div className="card-body">
            <div className="card-title h5">{user.username} </div>
            <div className="card-text">
              <b>Token</b>
              {user.accessToken.substring(0, 20)}...
              {user.accessToken.substring(user.accessToken.lenght - 20)}
            </div>
            <div className="card-text">
              <b> Id: </b> {user.id}
              <br />
              <b> email: </b> {user.email}
              <br />
              <b> roles: </b> {user.roles.lenght}
              <ul>
                {user.roles &&
                  user.roles.map((role, index) => <ul key={index}>{role}</ul>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
