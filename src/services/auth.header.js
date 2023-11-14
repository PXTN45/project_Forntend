// import { useAuthContext } from "../context/Auth.context";
export default function authHeader() {
  // console.log(user);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
