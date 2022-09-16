import { useState } from 'react';

function Nav({ setPage, defaultPage }) {
  const [isActivePage, setActivePage] = useState("Home");

  function navTo(target) {
    setPage(target);
  }

  return (
    <nav className="menubar">
      <ul className="menu">

        <li className={`${isActivePage === "Home" ? "active" : ""}`}><a href="#Home" onClick={(e) => {
          navTo('Home');
          setActivePage('Home');
        }}>HOME</a></li>

        <li className={`${isActivePage === "Jobs" ? "active" : ""}`}><a href="#Jobs" onClick={(e) => {
          navTo('Jobs');
          setActivePage('Jobs');
        }}>JOB TRACKER</a></li>

        <li className={`${isActivePage === "Completed" ? "active" : ""}`}><a href="#Completed" onClick={(e) => {
          navTo('Completed');
          setActivePage('Completed');
        }}>COMPLETED</a></li>
      </ul>
    </nav >
  );
}

export default Nav;