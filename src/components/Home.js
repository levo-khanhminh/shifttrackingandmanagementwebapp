import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  return (
    <div>
      <h1>THIS IS THE HOME PAGE!</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Home;
