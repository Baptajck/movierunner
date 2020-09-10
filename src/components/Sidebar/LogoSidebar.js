import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from './logoMovie2.png';

const LogoSidebar = ({ setExpanded }) => {
  const onItemClicked = () => {
    setExpanded(false);
  }
  return (
    <NavLink to="/" onClick={onItemClicked}>
      <img src={logo} alt="Logo" className="sidebar-logo"/>
    </NavLink>
  );
};

export default LogoSidebar;