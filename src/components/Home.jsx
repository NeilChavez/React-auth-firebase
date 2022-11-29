import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user, logOut, loading } = useAuthContext();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.warn(err);
    }
  };
 
  return (
    <div>
      Welcome {user.email}
      {user ? <button onClick={handleLogOut}>Logout</button> : null}
    </div>
  );
};

export default Home;
