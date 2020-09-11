import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CollapsibleComponent from 'react-collapsible-content';
import SubItemSidebar from './SubItemSidebar';

const MenuItem = ({ active, icon, title, expanded, route, subItems = [], onClick }) => {
  const Icon = icon;

  return (
    <div>
      {subItems && subItems.length ? (
          <div className="menuItem-column">
            <div className={`menuItem ${active && 'menuItem-activeContainer'}`} onClick={onClick}>
              {active && <div className="menuItem-activeBar"></div>}
              <Icon fill={active ? '#dde2ff' : ''} opacity={!active ? '0.4' : '1'} />
              <span className={`menuItem-title ${active && 'menuItem-activeTitle'}`}>{title}</span>
            </div>
            <CollapsibleComponent title={title} expanded={expanded}>
              {subItems.map((s, i) => (
                <NavLink to={s.route} key={i}>
                  {SubItemSidebar({ ...s }, i)}
                </NavLink>
              ))}
            </CollapsibleComponent>
          </div>
        ) : (
          <NavLink to={route} className="menuItem-column">
            <div className={`menuItem ${active && 'menuItem-activeContainer'}`} onClick={onClick}>
              {active && <div className="menuItem-activeBar"></div>}
              <Icon fill={active ? '#dde2ff' : ''} opacity={!active ? '0.4' : '1'} />
              <span className={`menuItem-title ${active && 'menuItem-activeTitle'}`}>{title}</span>
            </div>
          </NavLink>
        )}
    </div>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default MenuItem;