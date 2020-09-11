import React from 'react';
import PropTypes from 'prop-types';


const SubItemSidebar = ({active, icon, onClick, title}, index) => {
  return (
    <div
      key={`subitem-${index}`}
      className={`_row subItem ${active && 'subItem-activeContainer'} ${active ? 'subItem-activeBar' : 'subItem-inactiveBar'}`}
      onClick={onClick}
      style={{ height: 56 }}
    >
      {icon}
      <span className="subItem-title subItem-activeTitle">
        {title}
      </span>
    </div>
  );
}

SubItemSidebar.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default SubItemSidebar;