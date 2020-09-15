import React from "react";
import jwtDecode from "jwt-decode";
const Profile = (props) => {
  const jwt = localStorage.getItem("token");
  const user = jwtDecode(jwt);

  return (
    <div>{user && <h1 style={{ color: "black" }}>Hello...{user.name}</h1>}</div>
  );
};

export default Profile;
