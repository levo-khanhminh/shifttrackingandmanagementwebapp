import React from "react";
const styleLink = {
  textDecoration: "none",
  fontSize: "30px",
  color: "#ffffff",
};
const NavBar = ({ className }) => {
  return (
    <div className={className}>
      <a style={styleLink} href="/" className="home-header">
        Home
      </a>
      <a style={styleLink} href="/dashboard" className="home-header">
        Dashboard
      </a>
    </div>
  );
};

export default NavBar;
