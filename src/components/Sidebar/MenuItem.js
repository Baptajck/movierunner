import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ active, icon, title, setExpanded, setselectedItem }) => {
  const onItemClicked = (event) => {
    setExpanded(false);
    return setselectedItem(event.target.textContent);
  }

  const Icon = icon;

  console.log(active, title);
  return (
    <div className={`menuItem ${active && 'menuItem-activeContainer'}`} onClick={onItemClicked}>
      {active && <div className="menuItem-activeBar"></div>}
      <Icon fill={active ? '#dde2ff' : ''} opacity={!active ? '0.4' : '1'} />
      <span className={`menuItem-title ${active && 'menuItem-activeTitle'}`}>{title}</span>
    </div>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default MenuItem;