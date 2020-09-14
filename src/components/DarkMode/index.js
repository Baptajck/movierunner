import React, {useState, useEffect} from 'react';
import './DarkMode.scss';

import { FaMoon, FaSun } from 'react-icons/fa';

const DarkMode = () => {
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark" ? true : false);
  useEffect(() => {
    document
    .getElementsByTagName("HTML")[0]
    .setAttribute("data-theme", localStorage.getItem("theme"));
  },[]);

  const toggleThemeChange = () => {;
    if (checked === false) {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      setChecked(true);
    } else {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      setChecked(false);
    }
  }   
  const theme = localStorage.getItem("theme");
  console.log(theme);
  return(
    <div className="darkMode">
      <label className="darkMode-switch">
        <div className="darkMode-container-icon">
          <FaSun className="darkMode-container-icon--sun" />
          <FaMoon className="darkMode-container-icon--moon"/>
        </div>
        <input
          type="checkbox"
          defaultChecked={checked}
          onChange={() => toggleThemeChange()}
          className="darkMode-input"
        />
        <span className="darkMode-slider darkMode-round"></span>
      </label>
    </div>
  )
}

export default DarkMode;