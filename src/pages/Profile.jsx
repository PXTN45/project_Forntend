import { useAuthContext } from "../context/auth.context";

export const Profile = () => {
  const { user } = useAuthContext();
  return (
    <div className="container" id="profile" >
      <div className="row">
        <div
          className="card profile my-2 light" 
          style={{ width: "500px", borderRadius: "10px", margin:"5cm"}}
        >
          <div className="card-header"style={{ backgroundColor: "#ef6c00",color:"#fff" }}> Profile </div>
          <div className="card-body">
            <img src="https://cdn.blerp.com/thumbnails/10132e40-218a-11ee-8c08-5128a26885f3" alt="user image" style={{  height:"10rem",width:"10rem", borderRadius:"100% "}}/>
            <br/>
            <div className="card-title h5">{user.username} </div>
            {/* <div className="card-text">
              <b>Token</b>
              {user.accessToken.substring(0, 20)}...
              {user.accessToken.substring(user.accessToken.lenght - 20)}
            </div> */}
            <div className="card-text">
              <b> Id: </b> {user.id}
              <br />
              <b> email: </b> {user.email}
              <br/>
               <p>{user.roles}</p>
              <ul>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
