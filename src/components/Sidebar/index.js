import React, { useState } from 'react';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsPeopleCircle } from 'react-icons/bs'
import { FaHome, FaSearch } from 'react-icons/fa';
import { FiPlayCircle } from 'react-icons/fi';
import { RiMovie2Fill } from 'react-icons/ri';
import { CgScreen } from 'react-icons/cg';

import MenuItem from './MenuItem';
import LogoSidebar from './LogoSidebar';
import logoHeadBand from './logo-headband.png';
import DarkMode from '../DarkMode'

import useSidebar from './useSidebar';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const {
    isExpanded,
    isActive,
    onMenuItemClicked,
  } = useSidebar({ defaultPath: '/' });

  const isMobile = () => window.innerWidth <= 768;

  const toggleMenu = () => setExpanded(!expanded);

  const renderBurger = () => {
    return <div onClick={toggleMenu} className="sidebar-burger">
      <GiHamburgerMenu />
    </div>
  }

  const toggleClick = () => isMobile() && toggleMenu();

  return (
    <div className="sidebar">
      <div className="sidebar-headband">
        <div className="sidebar-headband-container">
          {(isMobile() && !expanded) && renderBurger()}
          <NavLink to="/">
            <img className="sidebar-headband-logo" src={logoHeadBand} alt="Logo Headband"/>
          </NavLink>
          <NavLink to="/search" className="sidebar-headband-search"><FaSearch /></NavLink>
        </div>
      </div>
      <div className={`_row ${expanded ? 'sidebar-mainContainer' : ''}`}>
        <div className={`sidebar-container ${expanded ? 'sidebar-show' : 'sidebar-hide'}`}>
          <LogoSidebar setExpanded={setExpanded} />
          <div className="sidebar-menuList">
            <MenuItem
              title="Accueil"
              route="/"
              icon={FaHome}
              active={isActive('/')}
              onClick={() => {
                toggleClick();
                onMenuItemClicked('/');
              }}
              toggleMenu={toggleMenu}
            />
            <MenuItem
              title="Rechercher"
              route="/search"
              icon={FaSearch}
              active={isActive('/search')}
              onClick={() => {
                toggleClick();
                onMenuItemClicked('/search');
              }} 
            />
            <MenuItem
              title="Films"
              route=""
              icon={RiMovie2Fill}
              active={isActive('/movies')}
              expanded={isExpanded('/movies')}
              onClick={() => onMenuItemClicked('/movies', { isCollapsible: true })}
              subItems={[
                {
                  title: 'A l\'affiche',
                  route: '/movies/poster',
                  icon: <FiPlayCircle width={20} fill={'#DDE2FF'} />,
                  onClick: () => {
                    toggleClick();
                    onMenuItemClicked('/movies/poster');
                  },
                  active: isActive('/movies/poster')
                },
                {
                  title: 'A venir',
                  route: '/movies/upcoming',
                  icon: <FiPlayCircle width={16} fill={'#DDE2FF'} />,
                  onClick: () => {
                    toggleClick();
                    onMenuItemClicked('/movies/upcoming');
                  },
                  active: isActive('/movies/upcoming')
                },
              ]}
            />
            <MenuItem
              title="Séries"
              icon={CgScreen}
              active={isActive('/shows')}
              expanded={isExpanded('/shows')}
              onClick={() => onMenuItemClicked('/shows', { isCollapsible: true })}
              subItems={[
                {
                  title: 'Populaires',
                  route: '/shows/popular',
                  icon: <FiPlayCircle width={20} fill={'#DDE2FF'} />,
                  onClick: () => {
                    toggleClick();
                    onMenuItemClicked('/shows/popular');
                  },
                  active: isActive('/shows/popular')
                },
              ]}
            />
            <MenuItem
              title="Développeur"
              route="/developer"
              icon={BsPeopleCircle}
              active={isActive('/developer')}
              onClick={() => {
                toggleClick();
                onMenuItemClicked('/developer');
              }}
            />
          </div>
          <DarkMode />
        </div>
        {isMobile && expanded && <div className="sidebar-burger-on" onClick={toggleMenu}></div>}
      </div>
    </div>
  );
}

export default Sidebar;