import React, { useState } from 'react';
import './Sidebar.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsPeopleCircle } from 'react-icons/bs'
import { FaHome, FaSearch } from 'react-icons/fa';

import MenuItem from './MenuItem';



const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setselectedItem] = useState('Accueil');

  const isMobile = () => window.innerWidth <= 768;

  const toggleMenu = () => setExpanded(!expanded);

  const renderBurger = () => {
    return <div onClick={toggleMenu} className="sidebar-burger">
      <GiHamburgerMenu />
    </div>
  }

  return (
    <div className="sidebar">
      <div className="_row sidebar-mainContainer">

        {(isMobile && !expanded) && renderBurger()}

        <div className={`sidebar-container ${expanded ? 'sidebar-show' : 'sidebar-hide'}`}>

          {/* LOGO */}

          <div className="sidebar-menuList">

            <MenuItem
              setExpanded={setExpanded}
              setselectedItem={setselectedItem}
              title="Accueil"
              icon={FaHome}
              active={selectedItem === 'Accueil'}
            />

            <MenuItem
              setExpanded={setExpanded}
              setselectedItem={setselectedItem}
              title="Rechercher"
              icon={FaSearch}
              active={selectedItem === 'Rechercher'}
            />

            <MenuItem
              setExpanded={setExpanded}
              setselectedItem={setselectedItem}
              title="Développeur"
              icon={BsPeopleCircle}
              active={selectedItem === 'Développeur'}
            />

          </div>
        </div>

        {isMobile && expanded && <div className="sidebar-burger-on" onClick={toggleMenu}></div>}

      </div>
    </div>
  );
}

export default Sidebar;