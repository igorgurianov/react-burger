import React from "react";
import styles from './nav-link.module.css';

class NavLink extends React.Component {
    render () {
        return (
            <div className={this.props.className}>
              {this.props.icon}
              <span className="text text_type_main-default">{this.props.text}</span>
            </div>
        )
    }
}

export default NavLink;
