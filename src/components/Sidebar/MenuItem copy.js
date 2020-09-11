import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CollapsibleComponent from 'react-collapsible-content';
import SubItemSidebar from './SubItemSidebar';

const MenuItem = ({ active, icon, title, expanded, setExpanded, setselectedItem, route, subItems = [], onClick }) => {
  const onItemClicked = (event) => {
    setExpanded(false);
    return setselectedItem(event.target.textContent);
  }

  const Icon = icon;
  console.log(route, title);
  return (
    <div className="menuItem-column">
      <div to={route !== '' ? route : ''} className={`menuItem ${active && 'menuItem-activeContainer'}`} onClick={onClick}>
        {active && <div className="menuItem-activeBar"></div>}
        <Icon fill={active ? '#dde2ff' : ''} opacity={!active ? '0.4' : '1'} />
        <span className={`menuItem-title ${active && 'menuItem-activeTitle'}`}>{title}</span>
      </div>
          {subItems && subItems.length ? (
            <CollapsibleComponent title={title} expanded={expanded}>
            <div>
              {subItems.map((s, i) => SubItemSidebar({ ...s }, i))}
            </div>
            </CollapsibleComponent>
          ) : (
            <div></div>
          )}
    </div>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default MenuItem;