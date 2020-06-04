import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuStyle = {
    
  }

  return (
    <div style={menuStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>
  );
};

export default Menu;
