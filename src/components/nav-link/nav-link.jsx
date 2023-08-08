import React from "react";
import styles from "./nav-link.module.css";
import PropTypes from "prop-types";

class NavLink extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.icon}
        <span className="text text_type_main-default">{this.props.text}</span>
      </div>
    );
  }
}

NavLink.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
