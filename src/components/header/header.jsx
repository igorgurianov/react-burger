import React from "react";
import NavPanel from "../nav-panel/nav-panel";
import style from '../header/header.module.css';

class AppHeader extends React.Component {
  render () {
    return (
      <header className={`${style.header} pt-4 pb-4`}>
        <NavPanel className="mt-4"></NavPanel>
      </header>
    )
  }
}


export default AppHeader;
