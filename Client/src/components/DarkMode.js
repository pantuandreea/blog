import React from "react";
import "../css/DarkMode.css";


function DarkMode({switchTheme}) {
  return (
    <div className="theme-switch-box">
      <label className="theme-switch" htmlFor="switch">
        <input type="checkbox" id="switch" onClick={switchTheme}/>
        <div className="icons">
          <div className="far fa-moon round"></div>
          <div className="fas fa-sun round"></div>
        </div>
      </label>
    </div>
  );
}

export default DarkMode;
