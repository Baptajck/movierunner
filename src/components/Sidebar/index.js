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

import useSidebar from './useSidebar';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const {
    isOpen,
    isExpanded,
    isActive,
    onMenuItemClicked,
    setIsOpen
  } = useSidebar({ defaultPath: '/' });

  // const [selectedItem, setselectedItem] = useState('Accueil');

  const isMobile = () => window.innerWidth <= 768;

  const toggleMenu = () => setExpanded(!expanded);

  const renderBurger = () => {
    return <div onClick={toggleMenu} className="sidebar-burger">
      <GiHamburgerMenu />
    </div>
  }

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
              onClick={() => onMenuItemClicked('/')}
            />
            <MenuItem
              title="Rechercher"
              route="/search"
              icon={FaSearch}
              active={isActive('/search')}
              onClick={() => onMenuItemClicked('/search')}
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
                  route: '/movies/pellicule',
                  icon: <FiPlayCircle width={20} fill={'#DDE2FF'} />,
                  onClick: () => onMenuItemClicked('/movies/pellicule'),
                  active: isActive('/movies/pellicule')
                },
                {
                  title: 'A venir',
                  route: '/movies/upcoming',
                  icon: <FiPlayCircle width={16} fill={'#DDE2FF'} />,
                  onClick: () => onMenuItemClicked('/movies/upcoming'),
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
                  title: 'Populaire',
                  route: '/shows/popular',
                  icon: <FiPlayCircle width={20} fill={'#DDE2FF'} />,
                  onClick: () => onMenuItemClicked('/shows/popular'),
                  active: isActive('/shows/popular')
                },
                {
                  title: 'A venir',
                  route: '/shows/upcoming',
                  icon: <FiPlayCircle width={16} fill={'#DDE2FF'} />,
                  onClick: () => onMenuItemClicked('/shows/upcoming'),
                  active: isActive('/shows/upcoming')
                },
              ]}
            />
            <MenuItem
              title="Développeur"
              route="/developer"
              icon={BsPeopleCircle}
              active={isActive('/developer')}
              onClick={() => onMenuItemClicked('/developer')}
            />
          </div>
        </div>
        {isMobile && expanded && <div className="sidebar-burger-on" onClick={toggleMenu}></div>}
      </div>
    </div>
  );
}

export default Sidebar;