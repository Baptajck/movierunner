import React, {useState, useEffect} from 'react';
import './DarkMode.scss';

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

  return(
    <div className="darkMode">
    <p>Vous êtes en {localStorage.getItem("theme")}</p>
      <label className="darkMode-switch">
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